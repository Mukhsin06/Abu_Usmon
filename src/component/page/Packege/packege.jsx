import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import Img from "../../asstes/travael.jpg";
import Img1 from "../../asstes/travael1.jpg";
import Img2 from "../../asstes/travel2.jpg";
import Img3 from "../../asstes/travel3.jpg";
import Img4 from "../../asstes/umra/photo_20_2024-08-10_18-07-10.jpg";
import Img5 from "../../asstes/umra/photo_18_2024-08-10_18-07-10.jpg";
import Img6 from "../../asstes/umra/photo_14_2024-08-10_18-07-10.jpg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from 'antd';

const MultiCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTrip, setCurrentTrip] = useState({});
    const [userName, setUserName] = useState('');
    const [userNumber, setUserNumber] = useState('');

    const sendToTelegram = (tripName) => {
        const botToken = '7485625468:AAGHeLepMjWactUjD0OPRSefD_8srs_r02o';
        const chatId = '-1002214508831';
        const message = `Trip Name: ${tripName}\nName: ${userName}\nPhone Number: ${userNumber}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Message sent:", data);
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
    };

    const showModal = (trip) => {
        setCurrentTrip(trip);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (userName.trim() && userNumber.trim()) {
            sendToTelegram(currentTrip.name);
            message.success('Message sent successfully!');
            setUserName(''); // Clear form
            setUserNumber(''); // Clear form
            setIsModalOpen(false); // Close modal
        } else {
            message.error('Please fill in all the fields.');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setUserName(''); // Clear form
        setUserNumber(''); // Clear form
    };

    const trips = [
        { name: "Trip to Thailand", img: Img },
        { name: "Trip to Bali", img: Img1 },
        { name: "Trip to Maldives", img: Img2 },
        { name: "Trip to Japan", img: Img3 },
        { name: "Trip to Umra", img: Img4 },
        { name: "Trip to Japan 2", img: Img5 },
        { name: "Trip to Japan 3", img: Img6 },
    ];

    return (
        <Carousel
            responsive={responsive}
            customLeftArrow={
                <button
                    className="custom-left-arrow"
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#EEAA2B',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        zIndex: 2,
                    }}
                >
                    ←
                </button>
            }
            customRightArrow={
                <button
                    className="custom-right-arrow"
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#EEAA2B',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        zIndex: 2,
                    }}
                >
                    →
                </button>
            }
        >
            {trips.map((trip, index) => (
                <div key={index} className="flex flex-col items-start p-4 sm:ml-[50px] lg:ml-20 sm:w-full lg:w-full">
                    <Image height={260} width={250} src={trip.img} alt={trip.name} className="w-[280px] h-[200px] rounded-lg object-cover shadow-lg" />
                    <h2 className="mt-4 text-left text-xl font-semibold">{trip.name}</h2>
                    <p className="text-left text-base text-gray-600 w-[70%]">
                        Join the leader in smallship cruising on the Great Lakes,
                    </p>
                    <Button onClick={() => showModal(trip)} className="w-[170px] h-[50px] mt-2 rounded-lg bg-[#EEAA2B] text-white shadow-md hover:bg-[#d99926]">
                        View Details
                    </Button>
                    <Modal
                        title={null}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                        centered
                        style={{
                            width: '90%',
                            maxWidth: '600px',
                            padding: '20px',
                        }}
                        bodyStyle={{
                            padding: '20px',
                            borderRadius: '10px',
                            backgroundColor: '#FDFDFD', // Set the background color
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        }}
                        wrapClassName="custom-modal-overlay"
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={currentTrip.img}
                                alt=""
                                className="w-[80%] max-w-md h-[300px] object-cover rounded-lg shadow-lg"
                            />
                            <h2 className="text-xl font-semibold mt-4 mb-2">{currentTrip.name}</h2>
                            <p className="text-center text-base text-gray-600 mb-4">Join the leader in smallship cruising on the Great Lakes,</p>
                            <input
                                type="text"
                                placeholder="Enter your name..."
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="my-2 w-full max-w-md border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EEAA2B]"
                            />
                            <input
                                type="text"
                                placeholder="Enter your number..."
                                value={userNumber}
                                onChange={(e) => setUserNumber(e.target.value)}
                                className="my-2 w-full max-w-md border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EEAA2B]"
                            />
                            <button
                                onClick={handleOk}
                                className="w-full max-w-md h-[40px] mt-4 bg-[#EEAA2B] text-white rounded-lg shadow-md hover:bg-[#d99926] transition duration-300"
                            >
                                Yuborish
                            </button>
                        </div>
                    </Modal>
                </div>
            ))}
        </Carousel>
    );
};

export default MultiCarousel;
