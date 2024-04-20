const secondsToString = (seconds: number): string => {
    let hours = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let strSeconds = seconds < 10 ? "0" + seconds : seconds;
    let strHours = hours < 10 ? "0" + hours : hours;
    return `${strHours}:${strSeconds}`;
}

export default secondsToString;