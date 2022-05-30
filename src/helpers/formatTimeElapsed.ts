export const formatTimeElapsed = (seconds: number) =>{
    let minutes = Math.floor( seconds/60 );
    seconds -= (minutes * 60); //-> seconds = seconds - (minutes*60);
    let secString = `${seconds < 10 ? '0'+seconds : seconds}`;
    let minString = `${(minutes < 10) || (minutes % 60)<10 ? '0'+minutes % 60: minutes % 60}`;
    let hrString = `${minutes>= 60? Math.floor(minutes/60) : ''}`;
    if (hrString !== ''){hrString = hrString + ':'};
    return `${hrString}${minString}:${secString}`;
};
