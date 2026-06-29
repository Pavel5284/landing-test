'use client';

import styles from './AboutProjectBlock.module.scss';
import Image from "next/image"
import MainImg from './img/MainImg.webp'
import ArrowTop from './img/ArrowTop.svg'
import VideoImg from './img/VideoImage.webp'
import PlayIcon from './img/PlayIcon.svg'
import ModalMain from '@/common/components/ui/Modal/ModalMain';
import { useState } from 'react';

export const AboutProjectBlock = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const handleOpenVideo = () => setIsVideoOpen(true);

    return (
        <>
            <section className={styles.aboutProject}>
            <div className='__container'>
                <div className={styles.wrapper}>

                    <div className={styles.imageCol}>
                        <p className={styles.sectionLabel}>О ПРОЕКТЕ</p>
                        <div className={styles.heroImgWrap}>
                            <Image
                                src={MainImg}
                                alt="Main image"
                                fill
                                quality={100}
                                loading="lazy"
                                className={styles.heroImg}
                            />
                        </div>

                        <div className={styles.arrow}>
                            <Image
                                src={ArrowTop}
                                alt="Arrow"
                                width={63}
                                height={88}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className={styles.contentCol}>
                        <span className={styles.accent}/>

                        <h2 className={styles.title}>
                            УЮТНОЕ И БЕЗОПАСНОЕ
                            <br/>
                            ПРОСТРАНСТВО ДЛЯ СЧАСТЛИВОЙ,
                            <br/>
                            <span className={styles.titleBlue}>
                                СПОКОЙНОЙ И РАЗМЕРЕННОЙ ЖИЗНИ
                            </span>
                        </h2>

                        <p className={styles.description}>
                            <span className={styles.descriptionBlue}>
                                КВАРТИРЫ ОТ 65 ДО 356 М² С ЧИСТОВОЙ ОТДЕЛКОЙ,
                            </span>
                            <br/>
                            БАЛКОНАМИ, ЛОДЖИЯМИ И ТЕРРАСАМИ В СОБСТВЕННОЙ
                            ЗАКРЫТОЙ ОХРАНЯЕМОЙ ТЕРРИТОРИИ.
                        </p>

                        <div className={styles.videoWrap}>
                            <div className={styles.video} onClick={handleOpenVideo}>
                                <div className={styles.videoInfo}>
                                    <span className={styles.videoLabel}>ВИДЕО О ПРОЕКТЕ</span>
                                    <span className={styles.videoDuration}>1:25 минут</span>
                                </div>
                                <span className={styles.videoLine}/>
                            </div>

                            <button className={styles.videoThumb} aria-label="Смотреть видео о проекте" onClick={handleOpenVideo}>
                                <Image
                                    src={VideoImg}
                                    alt="Превью видео"
                                    width={241}
                                    height={241}
                                    className={styles.videoThumbImg}
                                    loading="lazy"
                                />
                                <span className={styles.playBtn}>
                                    <span className={styles.playBtnInner}>
                                        <Image src={PlayIcon} alt={"Play Icon"} width={12} height={13} loading={"lazy"}/>
                                        PLAY
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            </section>

            <ModalMain active={isVideoOpen} setActive={setIsVideoOpen} closeButton={false} content fullScreen>
                <video src='/videos/video.mp4' controls autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </ModalMain>
        </>
    );
}
