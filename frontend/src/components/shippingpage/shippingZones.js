// frontend/src/components/shippingpage/ShippingZones.js
import React, { useState } from "react";
import { MapPin, Calculator } from "lucide-react";
import { AnimatedP } from "../../animation/animate";

function ShippingZones() {
  // State for shipping calculator
  const [calculatorData, setCalculatorData] = useState({
    weight: "",
    destination: "",
    shippingType: "standard",
  });
  // FIX: State for displaying calculator messages instead of alert()
  const [calculatorMessage, setCalculatorMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // Shipping zones data
  const shippingZones = [
    {
      id: "zone-1-lagos-metro", // Added unique ID for key prop
      zone: "Zone 1 - Lagos Metro",
      areas: [
        "Lagos Island",
        "Victoria Island",
        "Ikoyi",
        "Lekki",
        "Ajah",
        "Surulere",
      ],
      standardRate: "₦1,500",
      expressRate: "₦3,500",
      timeStandard: "1-3 days",
      timeExpress: "Same day",
    },
    {
      id: "zone-2-lagos-state", // Added unique ID for key prop
      zone: "Zone 2 - Lagos State",
      areas: ["Ikeja", "Alaba", "Badagry", "Epe", "Ikorodu", "Agege"],
      standardRate: "₦2,000",
      expressRate: "₦4,000",
      timeStandard: "2-4 days",
      timeExpress: "1-2 days",
    },
    {
      id: "zone-3-southwest-nigeria", // Added unique ID for key prop
      zone: "Zone 3 - Southwest Nigeria",
      areas: ["Ibadan", "Abeokuta", "Akure", "Ado-Ekiti", "Osogbo", "Ondo"],
      standardRate: "₦2,500",
      expressRate: "₦5,000",
      timeStandard: "3-5 days",
      timeExpress: "2-3 days",
    },
    {
      id: "zone-4-major-cities", // Added unique ID for key prop
      zone: "Zone 4 - Major Cities",
      areas: ["Abuja", "Kano", "Port Harcourt", "Kaduna", "Jos", "Benin City"],
      standardRate: "₦3,000",
      expressRate: "₦6,000",
      timeStandard: "4-6 days",
      timeExpress: "2-4 days",
    },
    {
      id: "zone-5-other-states", // Added unique ID for key prop
      zone: "Zone 5 - Other States",
      areas: ["All other Nigerian states and cities"],
      standardRate: "₦3,500",
      expressRate: "₦7,000",
      timeStandard: "5-7 days",
      timeExpress: "3-5 days",
    },
  ];

  // Handle calculator input changes
  const handleCalculatorChange = (e) => {
    setCalculatorData({
      ...calculatorData,
      [e.target.name]: e.target.value,
    });
    setCalculatorMessage(""); // Clear message on input change
  };

  // Calculate shipping cost (simplified logic)
  const calculateShipping = () => {
    if (!calculatorData.weight || !calculatorData.destination) {
      // FIX: Replace alert with state update for UI message
      setCalculatorMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    const weight = parseFloat(calculatorData.weight);
    // Simple validation for weight
    if (Number.isNaN(weight) || weight <= 0) {
      setCalculatorMessage("Please enter a valid weight (e.g., 2.5).");
      setMessageType("error");
      return;
    }

    const baseRate = calculatorData.shippingType === "express" ? 3500 : 1500;
    const weightMultiplier = Math.ceil(weight / 0.5) * 0.5; // Round up to nearest 0.5kg
    const estimatedCost = baseRate * weightMultiplier;

    // FIX: Replace alert with state update for UI message
    setCalculatorMessage(
      `Estimated shipping cost: ₦${estimatedCost.toLocaleString()}.`,
    );
    setMessageType("success");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <AnimatedP
            className="text-3xl font-bold text-gray-800 mb-4 font-jetbrain"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shipping Zones & Rates
          </AnimatedP>
          <AnimatedP
            className="text-gray-600 max-w-2xl mx-auto font-roboto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our shipping rates are based on destination zones. Find your area
            below to see delivery times and costs.
          </AnimatedP>
        </div>

        {/* Shipping Calculator */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <Calculator className="h-6 w-6 text-green-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-800 font-jetbrain">
              Shipping Calculator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              {/* FIX: Associate label with input using htmlFor and id */}
              <label
                htmlFor="weightInput"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weightInput" // Added id
                name="weight"
                value={calculatorData.weight}
                onChange={handleCalculatorChange}
                placeholder="e.g., 2.5"
                // FIX: Break long className
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                           focus:ring-green-500 focus:border-transparent font-roboto"
              />
            </div>
            <div>
              {/* FIX: Associate label with input using htmlFor and id */}
              <label
                htmlFor="destinationInput"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Destination
              </label>
              <input
                type="text"
                id="destinationInput" // Added id
                name="destination"
                value={calculatorData.destination}
                onChange={handleCalculatorChange}
                placeholder="e.g., Lagos"
                // FIX: Break long className
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                           focus:ring-green-500 focus:border-transparent font-roboto"
              />
            </div>
            <div>
              {/* FIX: Associate label with select using htmlFor and id */}
              <label
                htmlFor="shippingTypeSelect"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Shipping Type
              </label>
              <select
                id="shippingTypeSelect" // Added id
                name="shippingType"
                value={calculatorData.shippingType}
                onChange={handleCalculatorChange}
                // FIX: Break long className
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                           focus:ring-green-500 focus:border-transparent font-roboto"
              >
                <option value="standard">Standard</option>
                <option value="express">Express</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button" // FIX: Added explicit type="button"
                onClick={calculateShipping}
                // FIX: Break long className
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg
                           hover:bg-green-700 transition-colors duration-200 font-roboto font-medium"
              >
                Calculate
              </button>
            </div>
          </div>
          {/* FIX: Display calculator messages here */}
          {calculatorMessage && (
            <p
              className={`mt-4 text-center font-bold ${
                messageType === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {calculatorMessage}
            </p>
          )}
        </div>

        {/* Shipping Zones Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white p-6">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 mr-3" />
              <h3 className="text-xl font-bold font-jetbrain">
                Shipping Zones
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    // FIX: Break long className
                    className="px-6 py-4 text-left text-sm font-medium
                               text-gray-500 uppercase tracking-wider"
                  >
                    Zone & Areas
                  </th>
                  <th
                    // FIX: Break long className
                    className="px-6 py-4 text-left text-sm font-medium
                               text-gray-500 uppercase tracking-wider"
                  >
                    Standard Rate
                  </th>
                  <th
                    // FIX: Break long className
                    className="px-6 py-4 text-left text-sm font-medium
                               text-gray-500 uppercase tracking-wider"
                  >
                    Express Rate
                  </th>
                  <th
                    // FIX: Break long className
                    className="px-6 py-4 text-left text-sm font-medium
                               text-gray-500 uppercase tracking-wider"
                  >
                    Delivery Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shippingZones.map((zone) => (
                  <tr key={zone.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 font-jetbrain">
                          {zone.zone}
                        </div>
                        <div className="text-sm text-gray-500 font-roboto">
                          {zone.areas.join(", ")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-roboto">
                        {zone.standardRate}
                      </div>
                      <div className="text-sm text-gray-500 font-roboto">
                        {zone.timeStandard}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-roboto">
                        {zone.expressRate}
                      </div>
                      <div className="text-sm text-gray-500 font-roboto">
                        {zone.timeExpress}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        // FIX: Break long className
                        className="inline-flex px-2 py-1 text-xs font-semibold rounded-full
                                   bg-green-100 text-green-800"
                      >
                        Tracked
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3 font-jetbrain">
              Free Shipping Threshold
            </h4>
            <p className="text-blue-700 font-roboto">
              Orders over ₦25,000 qualify for free standard shipping within
              Nigeria. No coupon code needed - discount applied automatically at
              checkout.
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-3 font-jetbrain">
              Express Shipping Cutoff
            </h4>
            <p className="text-orange-700 font-roboto">
              Place your express shipping orders before 2:00 PM (Monday-Friday)
              for same-day dispatch. Weekend orders ship on the next business
              day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingZones;
