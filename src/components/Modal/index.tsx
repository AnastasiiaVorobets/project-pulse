import React, { RefObject, useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import "./index.scss";
import { ClearSearchIco } from "../../utils/constants/images.tsx";

type TProps = {
  show: boolean;
  onClose: () => void;
  targetRef: RefObject<HTMLElement | HTMLDivElement | null>;
  fullScreen?: boolean;
  xOffset?: number;
  children: React.ReactNode;
};

export const Modal = ({ show, onClose, targetRef, fullScreen = false, children, xOffset = 0 }: TProps) => {
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (targetRef.current && show) {
      const rect = targetRef.current.getBoundingClientRect();

      setModalPosition({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      });

      // setModalPosition({
      //   top: document.documentElement.clientHeight / 2,
      //   left: document.documentElement.clientWidth / 2,
      // });

      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show, targetRef]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 0, opacity: 0, scale: 1 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='modal'
          onClick={onClose}
        >
          <div
            className={`modal__content ${fullScreen ? "fullScreen" : ""}`}
            style={fullScreen
              ? { transform: `translateX(${xOffset}px)` }
              : {
                top: `${modalPosition.top}px`,
                left: `${modalPosition.left}px`
              }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              className='modal__close-button'
              onClick={onClose}
            >
              {ClearSearchIco}
            </button>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}