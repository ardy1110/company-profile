import React from 'react';

interface MenuItemProps {
  name: string;
  prices: string[];
  small?: boolean;
  single?: boolean;
}

export default function CoffeeMenu() {
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Plant */}
        <div className="relative mb-8">
          <div className="absolute -top-4 -left-4 text-6xl">🌿</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Kopi Robusta */}
          <div className="space-y-8">
            {/* Kopi Robusta Section */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4 rounded-t-3xl">
                <h2 className="text-white text-2xl font-bold tracking-wide">KOPI ROBUSTA</h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-end text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-20 text-center">Panas</span>
                  <span className="w-24 text-center">Panas<br/>Gls Besar</span>
                  <span className="w-20 text-center">Dingin</span>
                </div>
                
                <div className="space-y-2">
                  <MenuItem name="Kopi" prices={['6 K', '10 K', '12 K']} />
                  <MenuItem name="Sanger" prices={['8 K', '12 K', '16 K']} />
                  <MenuItem name="Kopi Coklat" prices={['10 K', '', '12 K']} />
                </div>
              </div>
            </div>

            {/* Kopi Arabica Section */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="p-6 pb-4">
                <div className="flex justify-end text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-20 text-center">Panas</span>
                  <span className="w-20 text-center">Dingin</span>
                </div>
                
                <div className="space-y-2">
                  <MenuItem name="Espresso" prices={['12 K', '15 K']} small />
                  <MenuItem name="Sanger Espresso" prices={['15 K', '20 K']} small />
                  <MenuItem name="Americano" prices={['12 K', '15 K']} small />
                  <MenuItem name="Long Black" prices={['12 K', '15 K']} small />
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-end text-sm font-semibold text-gray-700 mb-3">
                    <span className="w-20 text-center">Panas</span>
                  </div>
                  <div className="space-y-2">
                    <MenuItem name="V60 - Specialty" prices={['15 K']} single />
                    <MenuItem name="V60 - Natural Process" prices={['17 K']} single />
                    <MenuItem name="V60 - Luwak Liar" prices={['20 K']} single />
                    <MenuItem name="V60 - Wine" prices={['25 K']} single />
                    <MenuItem name="Vietnam Drip" prices={['17 K']} single />
                    <MenuItem name="Tubruk - Specialty" prices={['15 K']} single />
                    <MenuItem name="Tubruk - Natural Process" prices={['17 K']} single />
                    <MenuItem name="Tubruk - Luwak Liar" prices={['20 K']} single />
                    <MenuItem name="Tubruk - Wine" prices={['25 K']} single />
                  </div>
                </div>
              </div>
            </div>

            {/* Teh & Lemon Section */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4 rounded-t-3xl">
                <h2 className="text-white text-2xl font-bold tracking-wide">TEH & LEMON</h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-end text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-20 text-center">Panas</span>
                  <span className="w-24 text-center">1/2 Panas</span>
                  <span className="w-20 text-center">Dingin</span>
                </div>
                
                <div className="space-y-2">
                  <MenuItem name="Teh" prices={['5 K', '6 K', '7 K']} />
                  <MenuItem name="Teh Hijau" prices={['6 K', '7 K', '8 K']} />
                  <MenuItem name="Teh Tarik" prices={['8 K', '13 K', '14 K']} />
                  <MenuItem name="Teh Tarik Hijau" prices={['8 K', '13 K', '14 K']} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images and Additional Items */}
          <div className="space-y-8">
            {/* Coffee Cup Image */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <div className="text-8xl">☕</div>
                </div>
                <div className="absolute -top-4 -right-4 text-4xl">🫘</div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-800"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-800"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                </div>
              </div>
            </div>

            {/* Kopi Arabica Label */}
            <div className="bg-gradient-to-r from-red-900 to-red-800 px-8 py-6 rounded-full shadow-lg">
              <h2 className="text-white text-3xl font-bold tracking-wide text-center">KOPI ARABICA</h2>
            </div>

            {/* Pour Over Image */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center justify-center">
              <div className="text-9xl">🫖</div>
            </div>

            {/* Lemon Menu */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-end text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-20 text-center">Panas</span>
                  <span className="w-20 text-center">Dingin</span>
                </div>
                
                <div className="space-y-2">
                  <MenuItem name="Lemon Madu Classed" prices={['18 K', '20 K']} small />
                  <MenuItem name="Lemon Madu" prices={['16 K', '18 K']} small />
                  <MenuItem name="Lemon Manis" prices={['13 K', '15 K']} small />
                  <MenuItem name="Lemon Tea" prices={['15 K', '18 K']} small />
                  <MenuItem name="Lemon Tea Madu" prices={['18 K', '20 K']} small />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ name, prices, small, single }: MenuItemProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-gray-800 font-medium text-sm">{name}</span>
      <div className="flex gap-4">
        {prices.map((price, idx) => (
          <span 
            key={idx} 
            className={`font-bold text-gray-900 ${
              small ? 'w-20' : single ? 'w-20' : idx === 1 ? 'w-24' : 'w-20'
            } text-center`}
          >
            {price}
          </span>
        ))}
      </div>
    </div>
  );
}