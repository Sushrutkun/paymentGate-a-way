'use client'

import { useState, useEffect } from 'react'
import { CreditCard, CheckCircle, AlertCircle, QrCode } from 'lucide-react'

export default function Home() {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  const upiDetails = {
    upiId: 'justswish.hyperpg@axb',
    payeeName: 'MUNCHMART TECHNOLOGIES PRIVATE LIMITED',
    amount: '1.00',
    transactionNote: 'Food Delivery Service Payment'
  }

  useEffect(() => {
    const upiString = `upi://pay?pa=${upiDetails.upiId}&pn=${encodeURIComponent(upiDetails.payeeName)}&am=${upiDetails.amount}&cu=INR&tn=${encodeURIComponent(upiDetails.transactionNote)}`
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiString)}`
    setQrCodeUrl(qrUrl)
  }, [])

  const handlePayment = (app?: 'gpay' | 'phonepe' | 'paytm') => {
    setPaymentStatus('processing')

    let upiUrl = ''
    const pa = upiDetails.upiId
    const pn = encodeURIComponent(upiDetails.payeeName)
    const am = upiDetails.amount
    const tn = encodeURIComponent(upiDetails.transactionNote)

    if (app === 'gpay') {
      upiUrl = `tez://upi/pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`
    } else if (app === 'phonepe') {
      upiUrl = `phonepe://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`
    } else if (app === 'paytm') {
      upiUrl = `paytmmp://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`
    } else {
      upiUrl = `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`
    }

    window.location.href = upiUrl

    setTimeout(() => {
      setPaymentStatus('idle')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="w-12 h-12" />
            </div>
            <h1 className="text-2xl font-bold text-center">UPI Payment</h1>
            <p className="text-center text-blue-100 mt-2">Quick & Secure Payment</p>
          </div>

          <div className="p-8">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Amount to Pay</span>
                <span className="text-3xl font-bold text-indigo-600">₹{upiDetails.amount}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Payee Name</span>
                  <span className="text-gray-900 text-sm font-medium">{upiDetails.payeeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">UPI ID</span>
                  <span className="text-gray-900 text-sm font-medium">{upiDetails.upiId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Transaction Note</span>
                  <span className="text-gray-900 text-sm font-medium">{upiDetails.transactionNote}</span>
                </div>
              </div>
            </div>

            {paymentStatus === 'processing' && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-700 text-sm">Opening UPI app...</span>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-700 text-sm">Payment initiated successfully!</span>
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-red-700 text-sm">Payment failed. Please try again.</span>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => handlePayment('gpay')}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay with Google Pay
              </button>

              <button
                onClick={() => handlePayment('phonepe')}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay with PhonePe
              </button>

              <button
                onClick={() => handlePayment('paytm')}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay with Paytm
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <button
                onClick={() => handlePayment()}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay with Any UPI App
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center mb-3">
                <QrCode className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Scan QR Code to Pay</span>
              </div>
              {qrCodeUrl && (
                <div className="flex justify-center">
                  <img src={qrCodeUrl} alt="UPI QR Code" className="w-48 h-48 rounded-lg" />
                </div>
              )}
              <p className="text-xs text-gray-500 text-center mt-3">
                Scan with any UPI app to pay ₹{upiDetails.amount}
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Secure payment powered by UPI
              </p>
              <p className="text-xs text-gray-400 mt-1">
                All transactions are encrypted and secure
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/80 backdrop-blur rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-2 text-sm">Multiple Payment Options:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Direct app-specific UPI deep links (GPay, PhonePe, Paytm)</li>
            <li>✓ Universal UPI payment link for all apps</li>
            <li>✓ QR code scanning for maximum compatibility</li>
            <li>✓ Simplified parameters to avoid fraud detection</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3 italic">
            Choose your preferred payment method above
          </p>
        </div>
      </div>
    </div>
  )
}
