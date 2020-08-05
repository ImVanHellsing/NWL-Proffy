import { Request, Response } from 'express'

//Database Connection
import db from '../database/connection'

//Utils
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

export default class ClassController { 

  async store(req: Request, res: Response) {
    /**
     * Receiving data from request body
     */
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body

    const trx = await db.transaction()

    try {

      /**
       * Inserting user data
       */
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      })

      const user_id = insertedUsersIds[0]

      /**
       * Inserting class data
       */
      const insertedClassesIds = await trx('classes').insert({
        cost,
        subject,
        user_id,
      })

      const class_id = insertedClassesIds[0]

      /**
       * Inserting schedule data with the converted time
       */
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          to: convertHourToMinutes(scheduleItem.to),
          from: convertHourToMinutes(scheduleItem.from),
        }
      })

      await trx('class_schedule').insert(classSchedule)

      // Finalizing knex transaction
      await trx.commit()

      return res.status(201).send()

    } catch (error) {
      console.log(error);
      
      await trx.rollback()
      return res.status(400).json({ error: 'Unexpected error while creating new class!' })
    }

  }

  async index(req: Request, res: Response) {
    const filters = req.query

    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if(!week_day || !subject || !time) {
      return res.status(400).json({
        error: 'Missing filters to search classes!'
      })
    }

    const timeInMinutes = convertHourToMinutes(time)

    console.log(timeInMinutes);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])
    
    return res.status(201).json(classes)
  }
}