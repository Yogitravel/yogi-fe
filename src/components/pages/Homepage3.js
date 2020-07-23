import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import css from "./Homepage.css";

export default function Homepage2() {
	return (
		<div>
			<div className="page3">
				<div>
					<div id="testimonialpage" class="page page3">
						<div class="container testimonial-cover">
							<div class="row">
								<div class="testimonial col-12">
									<p class="description">
										<span class="danhdau"> " </span>
										Thuong is an amazing teacher and meditation guide. She focuses on breathing techniques and understanding your body and its limits. Many yoga classes I've tried before I often have
										to stop at some points because I'm not capable of certain moves, but with Thuong I never felt stressed during the sessions, yet afterwards I could feel that my practice is
										deepening. Highly recommend!
									</p>
									<div class="testimonial-content">
										<div class="pic">
											<img src="/testimonial-face2.jpg" />
										</div>
										<h3 class="title">Alexandre Mork</h3>
									</div>
								</div>

								<div class="testimonial testimonial2 col-12">
									<p class="description">
										<span class="danhdau"> " </span>
										Thuong is unlike any other yoga teacher that I have ever had. She is extremely knowledgeable about the yoga postures, meditation and yoga as a spiritual practice. Parts of yoga
										that I was always apprehensive about, she made more accessible for me. She is a kind, fun, compassionate and fiercely dedicated teacher. I wouldn't hesitate on recommending Thuong
										to anybody from any level - beginner to advanced.
									</p>
									<div class="testimonial-content">
										<div class="pic">
											<img src="/testimonial-face1.jpg" />
										</div>
										<h3 class="title">Lena Kim</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
