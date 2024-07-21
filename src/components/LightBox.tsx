import React, { useState, useEffect, useRef } from 'react'
import type { GalleryImage } from 'src/data/galleryImages'
import styles from '../styles/css/Lightbox.module.scss'

const LightBox = ({ images }: { images: GalleryImage[] }) => {
	const [currentImgIndex, setCurrentImgIndex] = useState(0)
	const [isMobile, setIsMobile] = useState<boolean>(false)
	const [isTablet, setIsTablet] = useState<boolean>(false)
	const ref1 = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Define the function to handle resize events
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 710)
			setIsTablet(window.innerWidth <= 1000)
		}

		// Execute the function once to set initial values
		handleResize()

		// Add event listener for resize events
		window.addEventListener('resize', handleResize)

		// Cleanup the event listener on component unmount
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const ImgClick = (index: number): void => {
		FocusMainDivToggle()
		setCurrentImgIndex(index)
	}

	const FocusMainDivToggle = (): void => {
		if (ref1.current) {
			ref1.current.style.display = ref1.current.style.display === 'flex' ? 'none' : 'flex'
		}
	}

	return (
		<div className={`${styles.LightBoxRow} ${isTablet ? styles.isTablet : ''}`}>
			{images.map((image, i) => (
				<div
					key={i}
					className={`${styles.LightBoxColumn} ${isMobile ? styles.isMobile : isTablet ? styles.isTablet : ''}`}
				>
					<div
						className={`${styles.LightBoxImg} ${isMobile ? styles.isMobile : ''}`}
						onMouseEnter={(e) => (e.currentTarget.className += ` ${styles.LightBoxImgHover}`)}
						onMouseLeave={(e) => (e.currentTarget.className = styles.LightBoxImg)}
					>
						<img
							src={image.image_path}
							alt=""
							style={{ objectFit: 'cover', height: '100%', width: '100%' }}
							onClick={() => ImgClick(image.index)}
						/>
					</div>
				</div>
			))}

			<div className={styles.LightBoxFocusMainDiv} ref={ref1}>
				<div className={styles.LightBoxFocusNavBar}>
					<p className={styles.LightBoxIndexPar}>
						{currentImgIndex + 1} / {images.length}
					</p>
					<img
						src="/assets/close_white.svg"
						alt="close"
						className={styles.LightBoxClose}
						onClick={FocusMainDivToggle}
					/>
				</div>
				<div className={styles.LightBoxFocusUnderDiv}>
					<div
						className={styles.LightBoxLeftArrowDiv}
						onClick={() => currentImgIndex > 0 && setCurrentImgIndex(currentImgIndex - 1)}
					>
						{currentImgIndex > 0 && (
							<img src="/assets/left_arrow.svg" alt="left" className={styles.LightBoxArrowImg} />
						)}
					</div>
					<div className={styles.LightBoxImgMainDiv}>
						<div
							className={styles.LightBoxImgSecondDiv}
							style={{ transform: `translateX(${currentImgIndex * -100}%)` }}
						>
							{images.map((image, i) => (
								<div key={i} className={styles.LightBoxImgDiv}>
									{currentImgIndex === i ||
									(currentImgIndex - 1 >= 0 && i == currentImgIndex - 1) ||
									(currentImgIndex + 1 < images.length && i == currentImgIndex + 1) ? (
										<img
											src={image.image_path}
											className={styles.LightBoxFocusedImg}
											alt="description"
										/>
									) : null}
								</div>
							))}
						</div>
					</div>
					<div
						className={styles.LightBoxRightArrowDiv}
						onClick={() =>
							currentImgIndex < images.length - 1 && setCurrentImgIndex(currentImgIndex + 1)
						}
					>
						{currentImgIndex < images.length - 1 && (
							<img src="/assets/right_arrow.svg" alt="right" className={styles.LightBoxArrowImg} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LightBox
