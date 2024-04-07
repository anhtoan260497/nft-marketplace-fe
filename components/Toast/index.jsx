import React, { useEffect } from "react";
import styles from './styles.module.scss'
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "@/features/toastSlice";

const Toast = () => {

    const toastStatus = useSelector((state) => state.toastReducer)
    const dispatch = useDispatch()
    console.log(toastStatus.type)

    useEffect(() => {
        let hidePopup
        if(hidePopup) clearTimeout(hidePopup)
        if (!toastStatus.isActive) return
        hidePopup = setTimeout(() => {
            dispatch(setToast({
                ...toastStatus, isActive: false
            }))
        }, 5000)
        return () => {
            clearTimeout(hidePopup)
        }
    }, [toastStatus.isActive])

    return (
        <>
            {toastStatus.type === 'success' ? (<div id="toast-success" className={clsx("fixed top-12 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800", toastStatus.isActive ? styles.isActive : styles.inActive)} role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">{toastStatus.message}</div>
            </div>) :
                toastStatus.type === 'error' ?
                    (<div id="toast-danger" className={clsx("fixed top-12 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800", toastStatus.isActive ? styles.isActive : styles.inActive)} role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            </svg>
                            <span className="sr-only">Error icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{toastStatus.message}</div>
                    </div>) :

                    (<div id="toast-warning" className={clsx("fixed top-12 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800", toastStatus.isActive ? styles.isActive : styles.inActive)} role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                            </svg>
                            <span className="sr-only">Warning icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{toastStatus.message}</div>
                    </div>)}</>
    )
}

export default Toast;