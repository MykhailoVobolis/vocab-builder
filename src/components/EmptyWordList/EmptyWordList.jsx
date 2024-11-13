import { useMedia } from "react-use";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../redux/modal/slice.js";

import CancelButton from "../CancelButton/CancelButton.jsx";
import FormButton from "../FormButton/FormButton.jsx";
import bloodReport from "../../assets/images/blood-report.png";
import bloodReport2x from "../../assets/images/blood-report@2x.png";
import bloodReportMob from "../../assets/images/blood-report-mob.png";
import bloodReportMob2x from "../../assets/images/blood-report-mob@2x.png";

import css from "./EmptyWordList.module.css";

export default function EmptyWordList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTablet = useMedia("(max-width: 768px)");

  const handleClose = () => {
    navigate("/dictionary");
  };

  const handleAddWord = () => {
    dispatch(openModal("addWord"));
    navigate("/dictionary");
  };

  return (
    <div className={css.container}>
      <div className={css.aboutContainer}>
        <h2 className={css.mainMessage}>You don't have a single word to learn right now.</h2>
        <p className={css.text}>
          Please create or add a word to start the workout. We want to improve your vocabulary and develop your
          knowledge, so please share the words you are interested in adding to your study.
        </p>
        <div className={css.buttonGroup}>
          <FormButton onSubmit={handleAddWord} variant="answerSaveButton">
            Add word
          </FormButton>
          <CancelButton onClose={handleClose} variant="answerCancelButton">
            Cancel
          </CancelButton>
        </div>
      </div>
      <picture className={css.bloodReportImage}>
        {isTablet ? (
          <>
            <source srcSet={bloodReportMob2x} type="image/png" media="(min-resolution: 2dppx)" />
            <img src={bloodReportMob} alt="Book Image" width="144" height="166" />
          </>
        ) : (
          <>
            <source srcSet={bloodReport2x} type="image/png" media="(min-resolution: 2dppx)" />
            <img src={bloodReport} alt="Book Image" width="264" height="289" />
          </>
        )}
      </picture>
    </div>
  );
}
