import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import image1 from "../Assets/Images/image 102.jpg";
import image2 from "../Assets/Images/image 103.jpg";
import image3 from "../Assets/Images/image 104.jpg";

const CarouselImages = [image1, image2, image3];

function getPositionX(event) {
	return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function getElementDimensions(ref) {
	const width = ref.current.clientWidth;
	const height = ref.current.clientHeight;
	return { width, height };
}
const Hero = () => {
	const [activeImageIndex, setActiveImage] = useState(0);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const dragging = useRef(false);
	const startPos = useRef(0);
	const currentTranslate = useRef(0);
	const prevTranslate = useRef(0);
	const currentIndex = useRef(activeImageIndex);
	const sliderRef = useRef(null);
	const animationRef = useRef(null);

	// there is the issue with the dimensions of the slider
	// after a reload it works fine
	console.log(activeImageIndex, currentIndex.current, dimensions);

	const setPositionByIndex = useCallback(
		(w = dimensions.width) => {
			currentTranslate.current = currentIndex.current * -(w - 45);
			prevTranslate.current = currentTranslate.current;
			setSliderPosition();
		},
		[dimensions.width]
	);
	useEffect(() => {
		if (activeImageIndex !== currentIndex.current) {
			transitionOn();
			currentIndex.current = activeImageIndex;
			setPositionByIndex();
		}
	}, [activeImageIndex, setPositionByIndex]);

	useLayoutEffect(() => {
		setDimensions(getElementDimensions(sliderRef));

		setPositionByIndex(getElementDimensions(sliderRef).width);
	}, [setPositionByIndex]);

	const transitionOn = () =>
		(sliderRef.current.style.transition = `transform 0.3s ease-out`);

	function touchStart(index) {
		return function (event) {
			transitionOn();
			currentIndex.current = index;
			startPos.current = getPositionX(event);
			dragging.current = true;
			animationRef.current = requestAnimationFrame(animation);
		};
	}

	function touchMove(event) {
		if (dragging.current) {
			const currentPosition = getPositionX(event);
			currentTranslate.current =
				prevTranslate.current + currentPosition - startPos.current;
		}
	}

	function touchEnd() {
		transitionOn();
		cancelAnimationFrame(animationRef.current);
		dragging.current = false;
		const movedBy = currentTranslate.current - prevTranslate.current;

		// if moved enough negative then snap to next slide if there is one
		if (movedBy < -100 && currentIndex.current < CarouselImages.length - 1) {
			currentIndex.current += 1;
			setActiveImage(currentIndex.current);
		}

		// if moved enough positive then snap to previous slide if there is one
		if (movedBy > 100 && currentIndex.current > 0) {
			currentIndex.current -= 1;
			setActiveImage(currentIndex.current);
		}

		transitionOn();

		setPositionByIndex();
	}

	function animation() {
		setSliderPosition();
		if (dragging.current) requestAnimationFrame(animation);
	}

	function setSliderPosition() {
		sliderRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
	}

	return (
		<div className="hero-container">
			<div
				className="carousel"
				ref={sliderRef}
				onTouchStart={touchStart(activeImageIndex)}
				onTouchMove={touchMove}
				onTouchEnd={touchEnd}
			>
				{CarouselImages.map((image, index) => (
					<img
						key={index}
						src={image}
						alt="Preview images"
						className="carousel-items"
					/>
				))}
			</div>
			<div className="dot-container">
				{CarouselImages.map((_, index) => (
					<span
						key={index}
						className={` ${activeImageIndex === index ? "active-dot" : "dot"}`}
						onClick={() => setActiveImage(index)}
					></span>
				))}
			</div>
		</div>
	);
};

export default Hero;
