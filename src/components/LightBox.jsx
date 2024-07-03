import React, { useRef, useState, useEffect } from 'react'

const LightBox = (props) => {
	const [currentImgIndex, setCurrentImgIndex] = useState(0)
	const [isMobile, setIsMobile] = useState(false)
	const [isTablet, setIsTablet] = useState(false)
	const ref1 = useRef()

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

	const ImgClick = (index) => {
		FocusMainDivToggle()
		setCurrentImgIndex(index)
	}

	const FocusMainDivToggle = () => {
		if (ref1.current) {
			ref1.current.style.display = ref1.current.style.display === 'flex' ? 'none' : 'flex'
		}
	}

	const styles = {
		LightBoxRow: {
			display: 'flex',
			flexWrap: 'wrap',
			width: isTablet ? '95%' : '80%',
			marginTop: '50px',
			marginBottom: '50px',
			maxWidth: '1024px',
		},
		LightBoxColumn: {
			flex: isMobile ? '100%' : isTablet ? '50%' : '25%',
		},
		LightBoxImg: {
			width: isMobile ? '100%' : '300px',
			padding: '10px',
			cursor: 'pointer',
			transition: 'ease-in-out 0.2s',
		},
		LightBoxImgHover: {
			boxShadow: '0 0 10px 0 rgb(63, 63, 63)',
		},
		LightBoxFocusMainDiv: {
			display: 'none',
			width: '100%',
			height: '100%',
			position: 'fixed',
			top: '0px',
			left: '0px',
			zIndex: 10,
			backgroundColor: 'rgba(0, 0, 0, 0.692)',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-start',
		},
		LightBoxArrowDiv: {
			width: '60px',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer',
			zIndex: 100,
		},
		LightBoxArrowImg: {
			width: '40px',
			height: '40px',
		},
		LightBoxImgMainDiv: {
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		LightBoxImgSecondDiv: {
			width: '90%',
			height: '90%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		LightBoxFocusImg: {
			maxWidth: '100%',
			maxHeight: '100%',
			objectFit: 'cover',
		},
		LightBoxFocusUnderDiv: {
			width: '100%',
			height: '100%',
			display: 'flex',
		},
		LightBoxFocusNavBar: {
			width: '100%',
			minHeight: '60px',
			backgroundColor: 'rgba(0, 0, 0, 0.886)',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		LightBoxIndexPar: {
			color: 'white',
			fontFamily: 'roboto',
			margin: '0%',
			marginLeft: '30px',
		},
		LightBoxClose: {
			width: '25px',
			height: '25px',
			cursor: 'pointer',
			marginRight: '30px',
		},
		LightBoxCard: {
			margin: '20px',
			width: isMobile ? '90%' : '300px',
			height: '300px',
			cursor: 'pointer',
		},
	}

	return (
		<div style={styles.LightBoxRow}>
			{props.images.map((image, i) => (
				<div key={i} style={styles.LightBoxColumn}>
					<img
						src={image.image_path}
						alt=""
						style={styles.LightBoxImg}
						onMouseEnter={(e) =>
							(e.currentTarget.style.boxShadow = styles.LightBoxImgHover.boxShadow)
						}
						onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
						onClick={() => ImgClick(image.index)}
					/>
				</div>
			))}

			<div style={styles.LightBoxFocusMainDiv} ref={ref1}>
				<div style={styles.LightBoxFocusNavBar}>
					<p style={styles.LightBoxIndexPar}>
						{currentImgIndex + 1} / {props.images.flat().length}
					</p>
					<img
						src="/assets/close_white.svg"
						alt="close"
						style={styles.LightBoxClose}
						onClick={FocusMainDivToggle}
					/>
				</div>
				<div style={styles.LightBoxFocusUnderDiv}>
					<div
						style={styles.LightBoxArrowDiv}
						onClick={() => currentImgIndex > 0 && setCurrentImgIndex(currentImgIndex - 1)}
					>
						<img src="/assets/left_arrow.svg" alt="left" style={styles.LightBoxArrowImg} />
					</div>
					<div style={styles.LightBoxImgMainDiv}>
						<div style={styles.LightBoxImgSecondDiv}>
							<div
								style={{
									width: '100%',
									height: '100%',
									backgroundSize: 'contain',
									backgroundImage: `url(${props.images.flat()[currentImgIndex].image_path})`,
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
								}}
							/>
						</div>
					</div>
					<div
						style={styles.LightBoxArrowDiv}
						onClick={() =>
							currentImgIndex < props.images.flat().length - 1 &&
							setCurrentImgIndex(currentImgIndex + 1)
						}
					>
						<img src="/assets/right_arrow.svg" alt="right" style={styles.LightBoxArrowImg} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default LightBox
