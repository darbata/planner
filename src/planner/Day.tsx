type props = {
    date: Date
}

export function Day({date} : props) {
    return (
        <div>
            {date.toString()}
        </div>
    )
}