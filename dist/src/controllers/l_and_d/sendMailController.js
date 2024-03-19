"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sendMail_1 = tslib_1.__importDefault(require("../../services/l_and_d_Services/sendMail"));
const sendMailController = (req, res) => {
    const { day_number, IncompleteTraineeList } = req.body;
    console.log("inside send mail", IncompleteTraineeList);
    if (!IncompleteTraineeList) {
        return res.status(400).json({ message: "Incomplete trainee list missing" });
    }
    if (!day_number) {
        return res.status(400).json({ message: "Day number is missing" });
    }
    if (IncompleteTraineeList.length == 0) {
        return res.status(400).json({ message: "Trainee list is empty" });
    }
    // console.log(user_id, IncompleteTraineeList);
    IncompleteTraineeList.map((item) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield (0, sendMail_1.default)(item.email, item.user_name, day_number);
    }));
    // sendMail();
    return res.status(200).json({ message: "Successfully sent mail" });
};
exports.default = sendMailController;
