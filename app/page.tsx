'use client'

import { useState } from 'react'
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react'

export default function Home() {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  const upiDetails = {
    upiId: 'example@paytm',
    payeeName: 'Merchant Name',
    amount: '5.00',
    transactionNote: 'Payment for services',
    merchantCode: 'MERCHANT123',
    transactionRef: `TXN${Date.now()}`
  }

  const handlePayment = () => {
    setPaymentStatus('processing')

    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiDetails.upiId)}&pn=${encodeURIComponent(upiDetails.payeeName)}&am=${upiDetails.amount}&cu=INR&tn=${encodeURIComponent(upiDetails.transactionNote)}&mc=${upiDetails.merchantCode}&tr=${upiDetails.transactionRef}`

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
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Merchant Code</span>
                  <span className="text-gray-900 text-sm font-medium">{upiDetails.merchantCode}</span>
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

            <button
              onClick={handlePayment}
              disabled={paymentStatus === 'processing'}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {paymentStatus === 'processing' ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay ₹{upiDetails.amount} Now
                </>
              )}
            </button>

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
          <h3 className="font-semibold text-gray-800 mb-2 text-sm">Payment Details Included:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ <strong>pa</strong> - Payee Address (UPI ID)</li>
            <li>✓ <strong>pn</strong> - Payee Name</li>
            <li>✓ <strong>am</strong> - Amount (₹5.00)</li>
            <li>✓ <strong>cu</strong> - Currency (INR)</li>
            <li>✓ <strong>tn</strong> - Transaction Note</li>
            <li>✓ <strong>mc</strong> - Merchant Code</li>
            <li>✓ <strong>tr</strong> - Transaction Reference</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3 italic">
            All required parameters are pre-filled to avoid risk policy errors
          </p>
        </div>
      </div>
    </div>
  )
}
