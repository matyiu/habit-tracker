function getDay(day, startDay) {
    const daysOfTheWeek = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
    }

    return (day + 7 - daysOfTheWeek[startDay]) % 7;
}

function checkPreviousWeekCompletedDay(day, completedDays, limit) {
    const prevDay = new Date(day.getTime());
    prevDay.setDate(prevDay.getDate() - 1);
    
    return (prevDay.getTime() >= limit.getTime()) && Boolean(completedDays.find(dayState => findDay(dayState, prevDay)));
}

function checkNextWeekCompletedDay(day, completedDays, limit) {
    const nextDay = new Date(day.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    
    return (nextDay.getTime() <= limit.getTime()) && Boolean(completedDays.find(dayState => findDay(dayState, nextDay)));
}

function findDay(day, date) {
    return day.date.getTime() === date.getTime();
}

function getWeekCompletedGroups(weekDates, dayStates, limits) {
    const { startDate, endDate } = limits;
    const completedDays = dayStates.filter(dayState => dayState.state === 'completed');

    const completedGroupsList = [];
    let currentCompletedGroup = {
        dates: [],
        before: false,
        after: false,
    };
    weekDates.forEach((day, index) => {
        if (completedDays.find(completedDay => findDay(completedDay, day))) {
            currentCompletedGroup.dates.push(day);
        } else {
            if (currentCompletedGroup.dates.length > 0) {
                completedGroupsList.push(currentCompletedGroup);
                currentCompletedGroup = {
                    dates: [],
                    before: false,
                    after: false,
                };
            }
        }

        if (index === weekDates.length - 1 && currentCompletedGroup.dates.length > 0) {
            completedGroupsList.push(currentCompletedGroup);
        }
    });

    const firstGroup = completedGroupsList[0];
    if (firstGroup && getDay(firstGroup.dates[0].getDay(), 'monday') === 0) {
        firstGroup.before = checkPreviousWeekCompletedDay(firstGroup.dates[0], completedDays, startDate);
    }

    const lastGroup = completedGroupsList[completedGroupsList.length - 1];
    if (lastGroup && getDay(lastGroup.dates[lastGroup.dates.length - 1].getDay(), 'monday') === 6) {
        lastGroup.after = checkNextWeekCompletedDay(lastGroup.dates[lastGroup.dates.length - 1], completedDays, endDate);
    }

    return completedGroupsList;
}

export { 
    getWeekCompletedGroups, 
    findDay, 
    checkNextWeekCompletedDay, 
    checkPreviousWeekCompletedDay, 
    getDay 
};