import styles from './AboutProjectBlock.module.scss';
import Image from "next/image"
import HeroImg from './img/HeroImg.webp'
import LogoSvg from './img/INCHAPIN.svg'

export const AboutProjectBlock = () => {
    return (
        <section className={styles.aboutProject}>
            <div className='__container'>
                <div className={styles.wrapper}>

                    {/* Левая колонка — изображение с логотипом поверх */}
                    <div className={styles.imageCol}>
                        <p className={styles.sectionLabel}>О ПРОЕКТЕ</p>
                        {/* Отдельный враппер для overflow:hidden на изображении */}
                        <div className={styles.heroImgWrap}>
                            <Image
                                src={HeroImg}
                                alt="Hero"
                                fill
                                quality={100}
                                loading="lazy"
                                className={styles.heroImg}
                            />
                        </div>

                        {/* Логотип выходит за правый край фото */}
                        <div className={styles.logoOverlay}>
                            <Image
                                src={LogoSvg}
                                alt="Logo"
                                width={88}
                                height={88}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Правая колонка — текстовый контент */}
                    <div className={styles.contentCol}>
                        <span className={styles.accent} />

                        <h2 className={styles.title}>
                            УЮТНОЕ И БЕЗОПАСНОЕ
                            {' '}ПРОСТРАНСТВО ДЛЯ СЧАСТЛИВОЙ,{' '}
                            <span className={styles.titleBlue}>
                                СПОКОЙНОЙ И РАЗМЕРЕННОЙ ЖИЗНИ
                            </span>
                        </h2>

                        <p className={styles.description}>
                            <span className={styles.descriptionBlue}>
                                КВАРТИРЫ ОТ 65 ДО 356 М² С ЧИСТОВОЙ ОТДЕЛКОЙ,
                            </span>{' '}
                            БАЛКОНАМИ, ЛОДЖИЯМИ И ТЕРРАСАМИ В СОБСТВЕННОЙ
                            ЗАКРЫТОЙ ОХРАНЯЕМОЙ ТЕРРИТОРИИ.
                        </p>

                        {/* Видео: линия + текст + круглое превью */}
                        <div className={styles.videoWrap}>
                            <div className={styles.video}>
                                <span className={styles.videoLine} />
                                <div className={styles.videoInfo}>
                                    <span className={styles.videoLabel}>ВИДЕО О ПРОЕКТЕ</span>
                                    <span className={styles.videoDuration}>1:25 минут</span>
                                </div>
                            </div>

                            <button className={styles.videoThumb} aria-label="Смотреть видео о проекте">
                                <Image
                                    src={HeroImg}
                                    alt="Превью видео"
                                    fill
                                    className={styles.videoThumbImg}
                                    loading="lazy"
                                />
                                <span className={styles.playBtn}>
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                                        <path d="M1 1L11 7L1 13V1Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                                    </svg>
                                    PLAY
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}