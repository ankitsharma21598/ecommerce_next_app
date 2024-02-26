"use client"
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

const SuccessfulPaymentPage = () => {
    const router = useRouter();

    return (
        <div>
            <Header />
            <div className="container mx-auto mt-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18.707 2.293a1 1 0 0 1 1.414 1.414l-12 12a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L7 13.586l11.293-11.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                </svg>
                <h2 className="text-2xl font-bold mb-4">Payment Successful</h2>
                <p className="text-lg mb-8">Thank you for your purchase!</p>
                <button 
                    onClick={() => router.push('/')}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default SuccessfulPaymentPage;
