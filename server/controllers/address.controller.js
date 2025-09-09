const AddressModel = require("../models/adderss.model");
const UserModel = require("../models/user.model");


const addAddressController = async (req, res) => {
    try {
        const userId = req.userId;// from auth middleware
        const { address_line, city, state, country, pincode, mobile } = req.body;
        const createAddress = new AddressModel({
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
            userId : userId
        })

        const addressData = await createAddress.save();

        const addUserAdress = await UserModel.findByIdAndUpdate(userId,{
            $push : { address_details : addressData._id }
        })

        return res.json({
            message : "Address added successfully",
            success : true,
            error : false,
            data: addressData
        })
    } catch (error) {
    return res.status(500).json({
        message : error.message || "Error in adding address",
        success : false,
        error : true,
    })
    }
}


 const getAddressController = async (req, res) => {
    try {
        const userId = req.userId;// from auth middleware

        const data = await AddressModel.find({ userId : userId , }).sort({ createdAt : -1});

        return res.json({
            data : data,
            message : "List of address",
            success : true,
            error : false,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || "Error in getting address",
            success : false,
            error : true,
        })
    }
 }


 const updateAddressController = async (req , res) =>{
    try {
        const userId = req.userId;// from auth middleware
        const {_id , address_line , city , state , country , mobile , pincode} = req.body;

        const updateAddress = await AddressModel.updateOne({_id : _id , userId : userId},{
            address_line,
            city,
            state,
            country,
            mobile,
            pincode
        })
        return res.json({
            message : "Address updated successfully",
            success : true,
            error : false,
            data : updateAddress
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || "Error in updating address",
            success : false,
            error : true,
        })
    }
 }


const  deleteAddressController = async (req , res) =>{
    try {
        const userId = req.userId;// from auth middleware
        const {_id} = req.body;

        const deleteAddress = await AddressModel.deleteOne({_id : _id , userId : userId},{
            status : false
        });
        return res.json({
            message : "Address deleted successfully",
            success : true,
            error : false,
            data : deleteAddress
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || "Error in deleting address",
            success : false,
            error : true,
        })
    }
}


module.exports = {
    addAddressController,
    getAddressController,
    updateAddressController,
    deleteAddressController
}