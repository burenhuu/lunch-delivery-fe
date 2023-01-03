import { Timetable } from "lib/types/merchant.type";
import { useEffect, useState } from "react";
import min from "date-fns/min";

export default function MerchantTimetable({
    timetable,
}: {
    timetable: Timetable[];
}) {
    const [weekday, setWeekday] = useState<string>("");
    const [saturday, setSaturday] = useState<string>("Амарна");
    const [sunday, setSunday] = useState<string>("Амарна");

    useEffect(() => {
        const weekdaysOpen: string[] = [];
        const weekdaysClose: string[] = [];
        timetable.map((day) => {
            if (day.day > 0 && day.day < 6) {
                //How to calculate average opening and closing time?
            } else if (day.day === 6) {
                if (!day.open && !day.close) {
                    setSaturday("Амарна");
                } else setSaturday(`${day.open} - ${day.close}`);
            } else if (day.day === 0) {
                if (!day.open && !day.close) {
                    setSunday("Амарна");
                } else setSunday(`${day.open} - ${day.close}`);
            }
        });
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
                    <div className="-mx-1">Даваа-Баасан</div>
                    <div>Бямба</div>
                    <div>Ням</div>
                </div>
                {/* Хүргэлт */}
                <div className="p-2.5 border-r border-gray/10 my-col-10">
                    <div>{`${timetable[0].open} - ${timetable[0].close}`}</div>
                    <div>{saturday}</div>
                    <div>{sunday}</div>
                </div>
                {/* Очиж авах */}
                <div className="p-2.5 my-col-10">
                    <div>{`${timetable[0].open} - ${timetable[0].close}`}</div>
                    <div>{saturday}</div>
                    <div>{sunday}</div>
                </div>
            </div>
        </div>
    );
}
