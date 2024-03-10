const $status = document.getElementById("status");
const $log = document.getElementById("log");
const $teacher = document.getElementById("teacher");
const $period = document.getElementById("period");

const currentTime = () => {
    return new Date().toString().slice(0, -31);
};

let currrentStatus = "in"; // Set default status to "in"

const handleNewRecord = (serialNumber, logData, time, teacher, period) => {
    const $record = document.createElement("div");
    $record.innerHTML = `\n${serialNumber} - <b>${logData}</b> - ${time} - Teacher: ${teacher} - Period: ${period}`;
    $log.appendChild($record);
};

if (!window.NDEFReader) {
    $status.innerHTML = "<h4>Unsupported device!</h4>";
}

const activateNFC = () => {
    const ndef = new NDEFReader();

    ndef.scan().then(() => {
        $status.innerHTML = "<h4>Bring a NFC tag towards the back of your phone...</h4>";
    }).catch(err => {
        console.log("Scan Error:", err);
        alert(err);
    });

    ndef.onreadingerror = (e) => {
        $status.innerHTML = "<h4>Read Error</h4>" + currentTime();
        console.log(e);
    };

    ndef.onreading = (e) => {
        const time = currentTime();
        const { serialNumber } = e;
        const teacher = $teacher.value; // Retrieve selected teacher's name
        const period = $period.value; // Retrieve selected period
        $status.innerHTML = `<h4>Last Read</h4>${serialNumber}<br>${currentTime()}`;
        handleNewRecord(serialNumber, currrentStatus, time, teacher, period);
        console.log(e);
    };
};

document.getElementById("start-btn").onclick = (e) => {
    activateNFC();
};
