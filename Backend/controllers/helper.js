const Product = require("../models/product");
const multer = require("multer");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const checkForLength = (arr) => {
    for (var e of arr)
        if (!e) return false;
    return true;
};

const getProducts = () => {
    return Product.find()
        .sort({ createdAt: -1 })
        .limit(100)
        .lean()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
            return [];
        });
};

const get_taken_products = () => {
    return Product.find({ noWarranty: false })
        .limit(100)
        .lean()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
            return [];
        });
};

// const storage = multer.diskStorage({
//     //destination for files
//     destination: function(request, file, callback) {
//         callback(null, "./public/uploads");
//     },

//     //add back the extension
//     filename: function(request, file, callback) {
//         callback(null, Date.now() + file.originalname);
//     },
// });

// //upload parameters for multer
// const upload = multer({
//     storage: storage,
// }).single("file");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            cb(null, "./public/uploads/");
        } else {
            cb({ message: "this file is neither a video or image file" }, false);
        }
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

// app.use(multer({storage}).single('image'));

//upload parameters for multer
const upload = multer({
    storage: storage,
}).single("file");

const ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "Please log in to view this resource");
    res.redirect("/login");
};

const imageuploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: "auto" })
    })
}

const updateImage = (id, file) => {
    cloudinary.uploader.destroy(id).then(() => {
            imageuploads(file);
        })
        .catch(err => {
            console.log("cloidignary err", err.message)
        })
}


module.exports = {
    checkForLength,
    upload,
    getProducts,
    get_taken_products,
    ensureAuthenticated,
    imageuploads,
    updateImage
};

//email = warrentymanagement.orders@gmail.com
//password = warrenty_management@345