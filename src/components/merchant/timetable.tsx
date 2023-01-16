import { Timetable } from "lib/types/merchant.type";
import { useEffect, useState } from "react";
import min from "date-fns/min";

export default function MerchantTimetable({
    timetable,
    timeTableDelivery,
}: {
    timetable: Timetable[];
    timeTableDelivery: Timetable[];
}) {
    const [week, setWeek] = useState<[]>([]);
    const [deliveryWeek, setDeliveryWeek] = useState<[]>([]);

    useEffect(() => {
        let week: any = []
        timeTableDelivery.map((day) => {
            if (day.day === 0) {
                week.push({
                    'day': day.day,
                    'name': 'Даваа',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            } else if (day.day === 1) {
                week.push({
                    'day': day.day,
                    'name': 'Мягмар',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            } else if (day.day === 2) {
                week.push({
                    'day': day.day,
                    'name': 'Лхагва',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
            else if (day.day === 3) {
                week.push({
                    'day': day.day,
                    'name': 'Пүрэв',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
            else if (day.day === 4) {
                week.push({
                    'day': day.day,
                    'name': 'Баасан',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
            else if (day.day === 5) {
                week.push({
                    'day': day.day,
                    'name': 'Бямба',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
            else if (day.day === 6) {
                week.push({
                    'day': day.day,
                    'name': 'Ням',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
        });
        setDeliveryWeek(week)
    }, [])

    console.log(timetable)

    useEffect(() => {
        let week: any = []
        timetable.map((day) => {
            if (day.day === 0) {
                week.push({
                    'day': day.day,
                    'name': 'Даваа',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            } else if (day.day === 1) {
                week.push({
                    'day': day.day,
                    'name': 'Мягмар',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            } else if (day.day === 2) {
                week.push({
                    'day': day.day,
                    'name': 'Лхагва',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
            else if (day.day === 3) {
                week.push({
                    'day': day.day,
                    'name': 'Пүрэв',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
            else if (day.day === 4) {
                week.push({
                    'day': day.day,
                    'name': 'Баасан',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
            else if (day.day === 5) {
                week.push({
                    'day': day.day,
                    'name': 'Бямба',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
            else if (day.day === 6) {
                week.push({
                    'day': day.day,
                    'name': 'Ням',
                    'active': day.active,
                    'time': `${day.open} - ${day.close}`
                })
            }
        });
        setWeek(week)
    }, []);

    return (
        <div className="my-col-15">
            <div className="font-medium">Цагийн хуваарь</div>
            <div className="bg-white rounded-2xl text-center grid grid-cols-3 text-sm gap-[1px]">
                <div className="p-2.5 border-b border-r border-gray/10">
                    Гараг
                </div>
                <div className="p-2.5 border-b border-r border-gray/10">
                    Хүргэлт
                </div>
                <div className="p-2.5 border-b border-gray/10">Очиж авах</div>
                <div className="p-2.5 border-r border-gray/10 my-col-10">
                    {
                        week.map((val: any) => {
                            return (
                                <div key={val.day}>{val.name}</div>
                            )
                        })
                    }
                </div>
                {/* Хүргэлт */}
                <div className="p-2.5 border-r border-gray/10 my-col-10">
                    {
                        deliveryWeek.map((val: any) => {
                            if (val.active) {
                                return (
                                    <div key={val.day}>{val.time}</div>
                                )
                            } else {
                                return (
                                    <div key={val.day}>Амарна</div>
                                )
                            }

                        })
                    }

                </div>
                {/* Очиж авах */}
                <div className="p-2.5 my-col-10">
                    {
                        week.map((val: any) => {
                            if (val.active) {
                                return (
                                    <div key={val.day}>{val.time}</div>
                                )
                            } else {
                                return (
                                    <div key={val.day}>Амарна</div>
                                )
                            }

                        })
                    }
                </div>
            </div>
        </div>
    );
}
