import mongoose from "mongoose";

const subsPlan = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3, trim: true },
    price: { type: Number, required: true, min: [0, "price must be more than 0"] },
    currency: { type: String, enum: ["INR", "USD", "YEN"], default: "INR" },
    frequecy: { type: String, enum: ["daily", "monthly", "quaterly", "yearly"] },
    paymentMethod: { type: String, required: true, trim: true },
    status: { type: String, enum: ["active", "failed", "expired"] },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date(); // Should be in past
        },
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-renewal date calculator
subsPlan.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 28,
      yearly: 365,
    };
    const periodDays = renewalPeriod[this.frequecy] || 30;
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + periodDays);
  }

  // Auto update status if renewal date is passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("subplan", subsPlan);
export default Subscription;
