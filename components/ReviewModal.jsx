import { Modal, ModalBody, Button, Spacer, Text } from "@nextui-org/react";
import { useState } from "react";

const ReviewModal = ({ isOpen, onClose, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleAddReview = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and comment.");
      return;
    }
    onAddReview({ rating, comment });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} animate="fade">
      <ModalBody>
        <h2 className="text-2xl font-semibold mb-4">Add Your Review</h2>
        <div className="flex items-center gap-2">
          <p>Rating:</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`cursor-pointer ${
                  star <= rating ? "text-warning" : "text-default"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <Spacer y={1} />
        <textarea
          rows="4"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <Spacer y={2} />
        <div className="flex justify-end">
          <Button onClick={handleAddReview}>Add Review</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ReviewModal;
