import { Timetable } from "lib/types/office.type";

export default function MerchantTimetable({
    timetable,
}: {
    timetable: Timetable[];
}) {
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
                    <div>11:30 - 14:00</div>
                    <div>Амарна</div>
                    <div>Амарна</div>
                </div>
                {/* Очиж авах */}
                <div className="p-2.5 my-col-10">
                    <div>09:00 - 21:00</div>
                    <div>10;00 - 20:00</div>
                    <div>Амарна</div>
                </div>
            </div>
        </div>
    );
}
