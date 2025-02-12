"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const DebugView = () => {
  return (
    <div className="relative space-y-3 px-4 py-3">
      <div className="w-full text-sm text-white bg-black/60 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="rounded-lg overflow-hidden">
          <div className="px-4 py-3 space-y-4">
            {/* Thoughts Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white/90">
                The following code is a quick AI snippet
              </h3>
              <div className="space-y-3">
                <div className="space-y-1 text-white/80 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400/80 mt-2 shrink-0" />
                    <div>
                      The code uses an image recognition algorthim to detect plastic
                    
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400/80 mt-2 shrink-0" />
                    <div>
                     It uses a machine learning framework called TensorFlow Lite, which is optimized for mobile devices
              
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400/80 mt-2 shrink-0" />
                    <div>
                      From plastic water bottles, to soda cans, to plastic bags, the code can detect a variety of plastic objects
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white/90">Solution</h3>
              <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language="python"
                  style={oneDark}
                  customStyle={{
                    background: "transparent",
                    padding: "16px",
                    margin: 0,
                    borderRadius: 0,
                    fontSize: "12px"
                  }}
                  showLineNumbers={true}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {`import tensorflow as tf
import numpy as np

# Data: Plastic recycled (X) vs CO2 reduced (Y)
X = np.array([5, 10, 15, 20, 25], dtype=float)  # Tons of plastic recycled
Y = np.array([50, 100, 150, 200, 250], dtype=float)  # CO2 reduced in kg

# Define a simple model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=1, input_shape=[1])  # One input, one output
])

# Compile and train the model
model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X, Y, epochs=100, verbose=0)

# Convert the model to TensorFlow Lite format
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save the TFLite model to a file
with open('eco_plastic_model.tflite', 'wb') as f:
    f.write(tflite_model)

print("Model converted to TFLite and saved.")
`}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* Complexity Analysis */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white/90">The Impact</h3>
              <div className="space-y-3">
                <div className="space-y-1 text-white/80 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400/80 mt-2 shrink-0" />
                    <div>Using this ML model, EcoPlastic can help prevent plastic pollution</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400/80 mt-2 shrink-0" />
                    <div>The scope goes beyond Canada, but extends to the entire world</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebugView
