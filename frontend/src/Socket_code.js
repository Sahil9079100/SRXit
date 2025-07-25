// import { waitForSocketIdAndLog } from './components/Student/StudentProfile';
import socket from './socket';

function Seperate_Socket_Listeners() {
    socket.on("connect", () => { });

    return () => {
        socket.off("connect", handleConnect);
        // socket.off("welcome", handleWelcome);
    };
}

// just for testing socket connection----------------------------------------------------------
const wel_student = () => {
    socket.on("welcome_student", (data) => { data.msg; });
    socket.off("welcome_student");
}
const wel_warden = () => {
    socket.on("welcome_warden", (data) => { data.msg });
    socket.off("welcome_warden");
}
const wel_gatekeeper = () => {
    socket.on("welcome_gatekeeper", (data) => { data.msg });
    socket.off("welcome_gatekeeper");
}
//--------------------------------------------------------------------------------------------------------------------

// Sending and Reciving request Logic here ----------------------------------------------------------
const sendRequestSOCKET = (user) => {
    socket.emit("sendRequestSOCKET", user);
}
const RequestedStudentListenSOCKET = (callback) => {
    socket.off("sendRequestSOCKET"); // Remove previous listeners
    socket.on("sendRequestSOCKET", (userr) => {
        callback(userr);
    });
};
//----------------------------------------------------------------------------------------

// Declining logic here ----------------------------------------------------------
const DeclineStudentSOCKET = (phone) => {
    socket.off("DeclineStudentSOCKET");
    const data = { phone, status: "declined", message: "Request DECLINED by Wardern" };
    socket.emit("DeclineStudentSOCKET", data);
    console.log("decline data:- ", data)
}
const StudentDeclineSOCKET = (callback) => {
    socket.off("DeclineStudentSOCKET")
    socket.on("DeclineStudentSOCKET", (data) => {
        callback(data);
    });
}
//----------------------------------------------------------------------------------------

// Accepting logic here----------------------------------------------------------------------------------------
const AccepctStudentSOCKET = (phone) => {
    socket.off("AccepctStudentSOCKET");
    const data = { phone, status: "Accepted", message: "Request ACCEPTED by Wardern" };
    socket.emit("AccepctStudentSOCKET", data);
    console.log("Accepted data:- ", data)
}
const StudentAccepctSOCKET = (callback) => {
    socket.off("AccepctStudentSOCKET")
    socket.on("AccepctStudentSOCKET", (data) => {
        callback(data);
    });
}
// ----------------------------------------------------------------------------------------

// Checking Gatekeeper permission logic here ----------------------------------------------------------
const PermissionFromGatekeeperSOCKET = (callback)=>{
    socket.off("PermissionFromGatekeeperSOCKET");
    socket.on("PermissionFromGatekeeperSOCKET", (data) => {
        console.log("Permission from gatekeeper: ", data);
        callback(data);
    });
}


export { Seperate_Socket_Listeners, wel_student, wel_warden, wel_gatekeeper, sendRequestSOCKET, RequestedStudentListenSOCKET, DeclineStudentSOCKET, StudentDeclineSOCKET, AccepctStudentSOCKET, StudentAccepctSOCKET, PermissionFromGatekeeperSOCKET };