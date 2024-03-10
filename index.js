const $status=document.getElementById("status")
const $log=document.getElementById("log")

const currentTime=()=>{
    return new Date().toString().slice(0,-31)
}

let currrentStatus="in" // Set default status to "in"

const handleNewRecord=(serialNumber,logData,time)=>{
    $record=document.createElement("div")
    $record.innerHTML=`\n${serialNumber} - <b>${logData}</b> - ${time}`
    $log.appendChild($record)
}

if(!window.NDEFReader){const $status = document.getElementById("status");
const $log = document.getElementById("log");
const $teacher = document.getElementById("teacher");
const $period = document.getElementById("period");

const currentTime = () => {
    return new Date().toString().slice(0, -31);
};

let currrentStatus = "in"; // Set default status to "in"

const handleNewRecord = (serialNumber, logData, time, teacher, period) => {
    $record = document.createElement("div");
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
        let time = currentTime();
        let { serialNumber } = e;
        let teacher = $teacher.value;
        let period = $period.value;
        $status.innerHTML = `<h4>Last Read</h4>${serialNumber}<br>${currentTime()}`;
        handleNewRecord(serialNumber, currrentStatus, time, teacher, period);
        console.log(e);
    };
};

document.getElementById("start-btn").onclick = (e) => {
    activateNFC();
};

    $status.innerHTML="<h4>Unsupported device!</h4>"
}

const activateNFC=()=>{
    const ndef = new NDEFReader()

    ndef.scan().then(()=>{
        $status.innerHTML="<h4>Bring a NFC tag towards the back of your phone...</h4>"
    })
    .catch(err=>{
        console.log("Scan Error:",err)
        alert(err)
    })

    ndef.onreadingerror = (e) => {
        $status.innerHTML="<h4>Read Error</h4>"+currentTime()
        console.log(e);
    };

    ndef.onreading = (e) => {
        let time=currentTime()
        let {serialNumber}=e
        $status.innerHTML=`<h4>Last Read</h4>${serialNumber}<br>${currentTime()}`
        handleNewRecord(serialNumber,currrentStatus,time)
        console.log(e);
    };
}

document.getElementById("start-btn").onclick=(e)=>{
    activateNFC()
}
