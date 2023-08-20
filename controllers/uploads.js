const path = require('path');
const { response } = require("express")


const cargarArchivo = (req, res=response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg: ' No hay archivos para subir'});
        return;
    }

    const { archivo } = req.files;

    const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ err });
        }

        res.json({ msg: 'File uploaded to' + uploadPath });
    })
    

}

module.exports = {
    cargarArchivo
}