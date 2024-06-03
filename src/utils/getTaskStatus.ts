import { ITodo } from "@/interfaces/interfaces";
import { TaskStatus } from "@/interfaces/enum";

export const getTaskStatus = (todoObj: ITodo) => {

    const deadline = todoObj.deadline
    const isCompleted = todoObj.completed
    let remainingTime = ""
    const deadlineTime = new Date(deadline).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = deadlineTime - currentTime;

    if (timeDiff <= 0) {
        remainingTime = TaskStatus.Overdue;
    } else if (timeDiff !== 0 && isCompleted) {
        remainingTime = TaskStatus.Completed;
    } else if (Number.isNaN(timeDiff)) {
        remainingTime = "No deadline";
    } else {
        const minutesLeft = Math.floor((timeDiff / (1000 * 60)) % 60);
        const hoursLeft = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        remainingTime = `${daysLeft}d ${hoursLeft}h ${minutesLeft}m left`

    }

    return remainingTime
};

