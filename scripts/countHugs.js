function is_leap(year) {

    if (year == 0) {
        console.log("Invalid year")
        return false
    }
    if (year < -46) {
        console.log("There weren't such concept")
        return false
    }
    if (year % 400 == 0
        || (year % 4 == 0 && year % 100 != 0))
        return true
    else return false
}

function convert_date(date) {
    date = date.split(".").map(el => parseInt(el))
    date[3] += 1 / 60 * date[4]
    date.pop()
    return date
}
function added_days(date_from) {
    if (date_from[1] in month_low)
        return 30
    else if (date_from[1] == 2) {
        if (is_leap(date_from[2])) return 29
        else return 28
    } else return 31
}

let month_low = [4, 6, 9, 11]
function count_days(date) {
    let date_from = convert_date(date[0])
    console.log('date_from: ', date_from);
    let date_to = convert_date(date[1])
    console.log('date_to: ', date_to);
    if (
        date_from[2] > date_to[2] ||
        (date_from[2] == date_to[2] && date_from[1] > date_to[1]) ||
        (date_from[2] == date_to[2] && date_from[1] == date_to[1] && date_from[0] > date_to[0]) ||
        (
            date_from[2] == date_to[2] && date_from[1] == date_to[1] &&
            date_from[0] == date_to[0] && date_from[3] > date_to[3]
        )
    ) {
        console.log("Invalid from-to relation")
        return 0
    }
    // let days = added_days(date_from) - date_from[0]
    let days = 0

    const BREAK_OUT = 100
    let count = 0
    if (date_from[1] == date_to[1] && date_from[2] == date_to[2]) {
        days += date_to[0] - date_from[0]
    } else while (true) {
        if (date_from[1] === 12) {
            date_from[1] = 1
            date_from[2] += 1
        } else date_from[1] += 1

        if (date_from[1] == date_to[1] && date_from[2] == date_to[2]) {
            days += date_to[0]
            break
        } else {
            days += added_days(date_from)
        }
        if (count === BREAK_OUT) {
            console.log("Out of LIMIT");
            break
        } else count++
    }
    days += (1 / 24 * (date_to[3] + 24 - date_from[3]))
    console.log('(1 / 24 * (date_to[3] + 24 - date_from[3])): ', (1 / 24 * (date_to[3] + 24 - date_from[3])));
    console.log('days: ', days);
    return days
}


export function count_hugs(date, hugs_per_day) {
    console.log('hugs_per_day: ', hugs_per_day);
    let days = count_days(date)
    console.log('days: ', days);
    if (days == 0) {
        return [0, 0]
    }
    console.log('days: ', days);

    let hugs = days * hugs_per_day
    let hours = parseInt(Math.floor(hugs / 60))
    let mins = parseInt(hugs % 60)

    return [hours, mins]
}