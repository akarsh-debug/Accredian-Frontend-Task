import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { SuccessModal } from './SuccessModal';
import { ErrorModal } from './ErrorModal';
import { Loader2 } from 'lucide-react';

const ReferralModal = ({ isOpen, onClose }) => {
  const verticals = {
    "Technology": ["Software Engineering", "Data Science", "Cybersecurity"],
    "Business": ["Marketing", "Finance", "HR Management"],
    "Design": ["Graphic Design", "UI/UX", "Animation"]
  };

  const [errMessage, setErrMessage] = useState("");

  const [formData, setFormData] = useState({
    referee_name: "",
    referee_email: "",
    referee_phone: "",
    vertical: "",
    program: "",
    referrer_name: "",
    referrer_email: "",
    referrer_phone: ""
  });
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSecondForm(true);
  };

  const handleBack = () => {
    setShowSecondForm(false);
  };

  const handlePopupModalClose = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setShowSecondForm(false);
    setFormData({
      referee_name: "",
      referee_email: "",
      referee_phone: "",
      vertical: "",
      program: "",
      referrer_name: "",
      referrer_email: "",
      referrer_phone: ""
    });
    onClose();
  };

  const trimFormData = (data) => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value
      ])
    );
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrMessage("");

    const trimmedData = trimFormData(formData);
    setFormData(trimmedData);

    try {
      const res = await axios.post('https://accredian-backend-task-dvaz.onrender.com/api/referral', formData);
      if (res.status === 201) {
        setShowSuccessModal(true);
      } else {
        setShowErrorModal(true);
      }
    } catch (err) {
      setErrMessage(err.response?.data?.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative border border-gray-200"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          {isLoading && (
            <motion.div 
              className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="text-gray-600 font-medium">Submitting referral...</p>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode='wait'>
            {!showSecondForm ? (
              <motion.div
                key="firstForm"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                  Refer a Friend
                </h2>
                <p className="text-gray-500 mt-2 text-center">
                  Enter your friend's details to refer them and earn rewards!
                </p>
                
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {Object.entries({
                    referee_name: "Friend's Name",
                    referee_email: "Friend's Email",
                    referee_phone: "Friend's Phone Number"
                  }).map(([name, placeholder]) => (
                    <div className="space-y-1" key={name}>
                      <input
                        type={name.includes('email') ? 'email' : name.includes('phone') ? 'tel' : 'text'}
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                                 bg-gray-50 transition-all duration-200 hover:border-blue-200"
                        required
                      />
                    </div>
                  ))}

                  <motion.div layout className="space-y-4">
                    <select
                      name="vertical"
                      value={formData.vertical}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                               bg-gray-50 transition-all duration-200 hover:border-blue-200"
                      required
                    >
                      <option value="" disabled>Select Vertical</option>
                      {Object.keys(verticals).map((vertical) => (
                        <option key={vertical} value={vertical}>{vertical}</option>
                      ))}
                    </select>

                    {formData.vertical && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                                   bg-gray-50 transition-all duration-200 hover:border-blue-200"
                          required
                        >
                          <option value="" disabled>Select Program</option>
                          {verticals[formData.vertical].map((program) => (
                            <option key={program} value={program}>{program}</option>
                          ))}
                        </select>
                      </motion.div>
                    )}
                  </motion.div>

                  <div className="flex justify-end gap-4 mt-6">
                    <motion.button
                      type="button"
                      onClick={handlePopupModalClose}
                      className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all 
                               font-medium shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-5 py-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg 
                               hover:shadow-lg transition-all font-medium shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="secondForm"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                  Your Details
                </h2>
                <p className="text-gray-500 mt-2 text-center">
                  Enter your details to complete the referral.
                </p>

                <form onSubmit={handleFinalSubmit} className="mt-6 space-y-4">
                  {Object.entries({
                    referrer_name: "Your Name",
                    referrer_email: "Your Email",
                    referrer_phone: "Your Phone Number"
                  }).map(([name, placeholder]) => (
                    <div className="space-y-1" key={name}>
                      <input
                        type={name.includes('email') ? 'email' : name.includes('phone') ? 'tel' : 'text'}
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                                 bg-gray-50 transition-all duration-200 hover:border-blue-200"
                        required
                      />
                    </div>
                  ))}

                  <div className="flex justify-between gap-4 mt-6">
                    <motion.button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all 
                               font-medium shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      Back
                    </motion.button>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={handlePopupModalClose}
                        className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all 
                                 font-medium shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="px-5 py-2 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg 
                                 hover:shadow-lg transition-all font-medium shadow-md disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                      >
                        Submit
                      </motion.button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={handlePopupModalClose} />
      <ErrorModal isOpen={showErrorModal} errMessage={errMessage} onClose={handlePopupModalClose} />
    </AnimatePresence>
  );
};

export default ReferralModal;