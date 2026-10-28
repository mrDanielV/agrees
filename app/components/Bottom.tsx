export function Bottom() {
    return (
        <footer className="p-8 bg-white z-10 border-t-2 border-gray-200 
                flex flex-col gap-4 items-center text-center
                md:flex-row md:justify-between md:items-center md:gap-8
                md:text-left">
            <div className="text-gray-600">
                2026 © ООО СК «Сбербанк страхование жизни», лицензия ЦБ РФ СЖ №3692б сл №3692, Российская Федерация, 121170, Москва, ул. Поклонная, д. 3, к. 1
            </div>
            <div className="text-xl text-sber-green font-bold whitespace-nowrap">
                8 495 500-55-50
            </div>
        </footer>
    )
}