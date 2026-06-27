import styles from './HeroBlock.module.scss';
import Image from "next/image"
import HeroImg from './img/HeroImg.webp'
import LogoSvg from './img/INCHAPIN.svg'

export const HeroBlock = () => {
    return (
        <section className={styles.hero}>
            <div className='__container'>
                <div className={styles.wrapper}>
                    <div className={styles.imageFull}>
                        <Image
                            src={HeroImg}
                            alt="Hero"
                            width={1760}
                            height={600}
                            quality={100}
                            loading={"lazy"}
                        />
                    </div>

                    <div className={styles.bottom}>
                        <p className={styles.text}>
                            ДOМ БИЗНЕС-КЛАССА
                            <br/>
                            ДЛЯ ЦЕНИТЕЛЕЙ РОСКОШИ
                        </p>

                        <div className={styles.svgWrapper}>
                            <Image
                                className={styles.svg}
                                src={LogoSvg}
                                alt="Logo"
                                width={862}
                                height={137}
                                loading={"lazy"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}