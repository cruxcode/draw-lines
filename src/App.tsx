import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	const dropareaRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);
	const topArrow = useRef<HTMLDivElement>(null);
	const leftArrow = useRef<HTMLDivElement>(null);
	const bottomArrow = useRef<HTMLDivElement>(null);
	const rightArrow = useRef<HTMLDivElement>(null);
	const arrowWidth = 2;
	function getCoords(elem: HTMLElement) {
		// crossbrowser version
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft =
			window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		var top = box.top + scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left, width: box.width, height: box.height };
	}
	useEffect(() => {
		if (
			dropareaRef.current &&
			childRef.current &&
			topArrow.current &&
			leftArrow.current &&
			bottomArrow.current &&
			rightArrow.current
		) {
			// get postion and height details
			const pos1 = getCoords(dropareaRef.current);
			const pos2 = getCoords(childRef.current);
			// draw top arrow
			topArrow.current.style.top = pos1.top + "px";
			topArrow.current.style.left =
				pos2.left + pos2.width / 2 - arrowWidth / 2 + "px";
			topArrow.current.style.height = pos2.top - pos1.top + "px";
			topArrow.current.style.width = arrowWidth + "px";
			// draw left arrow
			leftArrow.current.style.top =
				pos2.top + pos2.height / 2 - arrowWidth / 2 + "px";
			leftArrow.current.style.left = pos1.left + "px";
			leftArrow.current.style.width = pos2.left - pos1.left + "px";
			leftArrow.current.style.height = arrowWidth + "px";
			// draw bottom arrow
			bottomArrow.current.style.top = pos2.top + pos2.height + "px";
			bottomArrow.current.style.left =
				pos2.left + pos2.width / 2 - arrowWidth / 2 + "px";
			bottomArrow.current.style.height =
				pos1.height - (pos2.top - pos1.top + pos2.height) + "px";
			bottomArrow.current.style.width = arrowWidth + "px";
			// draw right arrow
			rightArrow.current.style.top =
				pos2.top + pos2.height / 2 - arrowWidth / 2 + "px";
			rightArrow.current.style.left = pos2.left + pos2.width + "px";
			rightArrow.current.style.width =
				pos1.left + pos1.width - (pos2.left + pos2.width) + "px";
			rightArrow.current.style.height = arrowWidth + "px";
		}
	}, [
		dropareaRef.current,
		childRef.current,
		topArrow.current,
		leftArrow.current,
		bottomArrow.current,
		rightArrow.current,
	]);
	return (
		<div className="editor">
			<section className="guides-container">
				<div className="arrow topArrow" ref={topArrow}></div>
				<div className="arrow leftArrow" ref={leftArrow}></div>
				<div className="arrow bottomArrow" ref={bottomArrow}></div>
				<div className="arrow rightArrow" ref={rightArrow}></div>
			</section>
			<div className="droparea" ref={dropareaRef}>
				<div className="child" ref={childRef}></div>
			</div>
		</div>
	);
}

export default App;
