'use client'

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
    const [image, setImage] = useState();
    const input = useRef();

    function onBtnClick() {
        input.current.click();
    }

    function onImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => setImage(fileReader.result);

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!image && (<p>No image picked yet.</p>)}
                    {image && (
                        <Image
                            src={image}
                            alt="The image selected by the user."
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                </div>
                <input
                    type="file"
                    id={name}
                    className={classes.input}
                    accept="image/png, image/jpeg"
                    name={name}
                    required
                    ref={input}
                    onChange={onImageChange}
                />
                <button type="button" className={classes.button} onClick={onBtnClick}>Pick an image</button>
            </div>
        </div>
    );
}
