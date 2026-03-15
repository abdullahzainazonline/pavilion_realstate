const fs = require('fs');
let code = fs.readFileSync('src/components/sections/LocationFacts.tsx', 'utf8');

const regex = /(\{\/\*\s*Bouncing Pin Pointing Effect\s*\*\/\})[\s\S]*?(?=\{\/\*\s*Desktop Legends\s*\*\/})/;

const fixedBlock = `{/* Bouncing Pin Pointing Effect */}
                {/* Exact coordinates pointing precisely to the orange triangle ("JALAN RAJA CHULAN" area) */}
                <div className="absolute left-[46%] top-[66%] lg:left-[46%] lg:top-[66%] w-[160px] h-[160px] z-20 pointer-events-none origin-bottom -translate-x-[50%] -translate-y-[100%] flex items-center justify-center">
                  
                  {/* Subtle Creative Glowing Ring (reduced intensity) */}
                  <div className="absolute inset-[-8px] rounded-full border-2 border-[#ffd700]/40 animate-[spin_4s_linear_infinite]" />
                  
                  {/* Floating Pin */}
                  <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex flex-col items-center justify-end"
                  >
                    <div className="relative w-[160px] h-[160px] z-20 drop-shadow-[0_0_30px_rgba(255,215,0,0.9)] border-2 border-[#ffd700]/50 rounded-full">
                      <Image
                        src="/new_location_pin.svg"
                        alt="Location Pin"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    {/* Prominent Shadow under the bouncing pin */}
                    <div className="w-16 h-6 bg-black/80 blur-[5px] rounded-full mt-8 mx-auto animate-pulse" />
                  </motion.div>
                </div>
              </div>
            </div>

            `;

code = code.replace(regex, fixedBlock);
fs.writeFileSync('src/components/sections/LocationFacts.tsx', code);
console.log('Success JS Replace');
