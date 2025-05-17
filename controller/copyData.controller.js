import dataCopyModel from "../model/dataCopy.model.js";
export const getAllData = async (req, res) => {
    try {
        const data = await dataCopyModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const addData = async (req, res) => {
    try {
        const { code, title } = req.body;
        if (!code || !title) {
            return res.status(400).json({ message: "Code and title are required." });
        }
        const newData = new dataCopyModel({
            code,
            title,
        });
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedData = await dataCopyModel.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({ message: "Data not found." });
        }
        res.status(200).json({ message: "Data deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const { code, title } = req.body;
        let updatedData = await dataCopyModel.findById(id);
        if (!updatedData) {
            return res.status(404).json({ message: "Data not found." });
        }
        // Update code and title
        updatedData.code = code;
        updatedData.title = title;
        updatedData.updateCount = (updatedData.updateCount || 0) + 1;

        await updatedData.save();
        res.status(200).json({
            message: "Data updated successfully.",
            data: updatedData
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
