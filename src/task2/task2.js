import axios from 'axios';
import React, { useState } from "react";

// Task: This page opens a dialog, which is supposed to fetch a value, then close the dialog. The problem is that
// The dialog closes and only afterwards does the value update. How can we remove this jankiness?
export const MyParentComponent = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [result, setResult] = useState({ value: false });

    return (
        <div>{"This page contains a 'dialog' which can be used to fetch a value from an API and display it"}
            {
                isDialogOpen ? <DialogComponent setResultCallback={setResult} setDialogCallback={setIsDialogOpen} /> : (
                    <div>
                        <div>
                            {result.value ? `The value is: ${result.value}` : "There is currently no value"}
                        </div>
                        <button onClick={() => setIsDialogOpen(true)}>
                            Click me to open the dialog
                        </button>
                    </div>
                )
            }
        </div>
    )
}


const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
}

export const makeRandomString = () => (Math.random() + 1).toString(36).substring(7);

export const checkEmotions = () => {
    return axios
        .request({
            method: "POST",
            url: "https://app.truefilter.io/api/emotions",
            headers,
            data: {
                txts: [makeRandomString()],
            },
        })
};


export const DialogComponent = (props) => {
    const { setResultCallback, setDialogCallback } = props;

    const fetchAndStore = () => {
        checkEmotions()
            .then(function(response) {
                const value = response?.data?.output.emotions.values[0];
                setResultCallback({ value })
            })

        setDialogCallback(false)

    }

    return (
        <div style={{padding: "40px", borderColor: "white", borderStyle: "solid", margin: "20px"}}>
            <div>
                {`This is the "dialog" to fetch and save some data`}
            </div>
            <button onClick={fetchAndStore} style={{fontSize: "18px"}}>
                Click me to fetch and save a value and close the dialog
            </button>
        </div>
    )


}
