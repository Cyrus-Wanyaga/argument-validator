import anime from "animejs";
import {createRef, useEffect} from "react";
import styles from '../styles/Loading.module.css'

export default function Loading({}) {
    const animationRef = createRef()

    useEffect(() => {
        anime({
            targets: [document.querySelectorAll(".anim_shape")],
            translateX: function (el) {
                return el.getAttribute('data-x');
            },
            translateY: function (el, i) {
                return el.getAttribute('data-y');
            },
            scale: function (el, i, l) {
                return (l - i) + .25;
            },
            rotate: function () {
                return anime.random(-360, 360);
            },
            borderRadius: function () {
                return ['0%', anime.random(10, 20) + '%'];
            },
            duration: 1000,
            delay: function () {
                return anime.random(0, 400);
            },
            direction: 'alternate',
            loop: true
        })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.shape + " anim_shape"} ref={animationRef} data-x={"-200%"} data-y={"100%"}></div>
            <div className={styles.shape + " anim_shape"} ref={animationRef} data-x={"0"} data-y={"-50%"}></div>
            <div className={styles.shape + " anim_shape"} ref={animationRef} data-x={"100%"} data-y={"-200%"}></div>
        </div>
    )
}