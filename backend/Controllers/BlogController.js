const { default: mongoose } = require("mongoose");
const blog = require("../Database/Models/BlogModel");

const postBlog = async (req, res) => {
    try {
        const user = req.user;
        if (!user.isDoctor) {
            return res.status(400).send("Your Are Not Doctor");
        }
        const id = user._id;
        const newBlog = new blog({
            doctorId: id, description: req.body.description, category: req.body.category,
            title: req.body.title, date: req.body.date
        });
        const savedNewBlog = await newBlog.save();
        res.status(200).json({ publishBlog: savedNewBlog });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const getAllBlog = async (req, res) => {
    try {
        const Todaydate = new Date();
        const AllBlogs = await blog.aggregate([{
            $match: { date: { $lte: Todaydate } }
        }, {
            $lookup: {
                from: 'doctor',
                localField: 'doctorId',
                foreignField: '_id',
                as: 'doc'
            }
        }
            , {
            $unwind: "$doc"
        }, {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                category: 1,
                date: 1,
                name: '$doc.name',
                doctorId: '$doc._id'
            }
        },
        {
            $sort: {
                date: -1
            }
        }
        ]);
        res.status(200).json({ allBlogs: AllBlogs });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const getBlog = async (req, res) => {
    try {
        const user = req.user;
        if (!user.isDoctor) {
            return res.status(400).send("Your Are Not Doctor");
        }
        const id = user._id;
        const blogs = await blog.aggregate([
            {
                $match: { doctorId: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'doctor',
                    localField: 'doctorId',
                    foreignField: '_id',
                    as: 'doc'
                }
            },
            {
                $unwind: "$doc"
            }, {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    category: 1,
                    date: 1,
                    name: '$doc.name',
                    doctorId: '$doc._id'
                }
            },
            {
                $sort: {
                    date: -1
                }
            }
        ])
        return res.status(200).json({ "blogs": blogs });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    postBlogMethod: postBlog,
    getBlogsMethod: getAllBlog,
    getBlog: getBlog
}