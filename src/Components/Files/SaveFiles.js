// import moment from "moment";
import { API, URL_API } from '../../API/comunicacionApi';

const SaveFiles = async (file) => {

    let name = file.split('/');
    name = name[name.length - 1];
    const file2 = {
        uri: file,             // e.g. 'file:///path/to/file/image123.jpg'
        name: name,            // e.g. 'image123.jpg',
        type: 'image/jpg'
    }

    const body = new FormData()
    body.append('file', file2)

    fetch(URL_API + `/foto/${name}`, {
        method: 'POST' ,
        body
    })

    // let name = file.split('/');
    // name = name[name.length - 1];

    // const img = new FormData();

    // img.set(name, file);
    // // img.append("file", e.files[0]);
    // if (img) {
    //     // name = moment().format("DD-MM-YYYY") + "--" + file.key;
    //     // console.log("fio ",img);
        // await API.POST(`/foto/${name}`, body, { headers: { 'Content-Type': 'multipart/form-data' } });
    // }

    return name;
}

module.exports = {
    SaveFiles
}