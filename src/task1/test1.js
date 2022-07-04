import React, { useEffect, useState } from "react";

// Task: By changing only one line in the file, stop the infinite rerender loop, while still allowing the
// ParentComponent component to update its rerender counter
export const MyParentComponent = () => {
    const [count, setCount] = useState(0);

    return (
        <div>{`The parent component has re-rendered ${count} times`}
            <MyChildComponent callback={() => setCount(count + 1)} />
        </div>
    )
}

export const MyChildComponent = (props) => {
    const { callback } = props;

    const [count, setCount] = useState(0);


    useEffect(() => {
        callback();
    }, [count, callback]);


    return (
        <div> {`The child component has re-rendered ${count} times`}
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )


}
