import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const plans = [
  {
    name: 'Starter',
    price: '€99',
    period: 'per maand',
    features: [
      '5 actieve vacatures',
      '50 kandidaat profielen bekijken',
      'Basis ondersteuning',
      'Email notificaties',
      'Standaard rapportage'
    ],
    recommended: false
  },
  {
    name: 'Professional',
    price: '€249',
    period: 'per maand',
    features: [
      '20 actieve vacatures',
      'Onbeperkt kandidaat profielen',
      'Prioriteit ondersteuning',
      'Email & SMS notificaties',
      'Geavanceerde rapportage',
      'Dedicated account manager',
      'Toegang tot premium kandidaten'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Op maat',
    period: 'neem contact op',
    features: [
      'Onbeperkt actieve vacatures',
      'Onbeperkt kandidaat profielen',
      '24/7 Premium ondersteuning',
      'Alle notificatie kanalen',
      'Custom rapportage & analytics',
      'Dedicated account team',
      'API toegang',
      'White-label optie',
      'Custom integraties'
    ],
    recommended: false
  }
];

export default function EmployerSubscription() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPlan] = useState('Professional'); // Simulated current plan
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>Abonnement Beheren | Glodinas Flex Work</title>
        <meta name="description" content="Beheer uw abonnement en bekijk uw gebruik" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/employer/dashboard" className="text-blue-600 hover:text-blue-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Terug naar Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Abonnement</h1>
              <div className="w-40"></div>
            </div>
          </div>
        </div>

        {/* Current Plan Overview */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Huidig Abonnement</h2>
                <p className="text-gray-600">U bent momenteel op het {currentPlan} plan</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">€249</div>
                <div className="text-gray-600">per maand</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">15 / 20</div>
                <div className="text-sm text-gray-600">Actieve Vacatures</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">∞</div>
                <div className="text-sm text-gray-600">Kandidaat Profielen</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">142</div>
                <div className="text-sm text-gray-600">Sollicitaties deze maand</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">23</div>
                <div className="text-sm text-gray-600">Dagen tot verlenging</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Upgrade Plan
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                Annuleer Abonnement
              </button>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white rounded-lg shadow-md p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-semibold transition ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Maandelijks
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-semibold transition ${
                  billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Jaarlijks
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Bespaar 20%
                </span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  plan.recommended ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="bg-blue-600 text-white text-center py-2 font-semibold">
                    Aanbevolen
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      plan.name === currentPlan
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : plan.recommended
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                    disabled={plan.name === currentPlan}
                  >
                    {plan.name === currentPlan
                      ? 'Huidig Plan'
                      : plan.price === 'Op maat'
                      ? 'Neem Contact Op'
                      : 'Selecteer Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Factuurgeschiedenis</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Datum</th>
                    <th className="text-left py-3 px-4">Beschrijving</th>
                    <th className="text-left py-3 px-4">Bedrag</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Factuur</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '01-09-2025', desc: 'Professional Plan - September 2025', amount: '€249,00', status: 'Betaald' },
                    { date: '01-08-2025', desc: 'Professional Plan - Augustus 2025', amount: '€249,00', status: 'Betaald' },
                    { date: '01-07-2025', desc: 'Professional Plan - Juli 2025', amount: '€249,00', status: 'Betaald' },
                    { date: '01-06-2025', desc: 'Starter Plan - Juni 2025', amount: '€99,00', status: 'Betaald' }
                  ].map((invoice, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{invoice.date}</td>
                      <td className="py-3 px-4">{invoice.desc}</td>
                      <td className="py-3 px-4 font-semibold">{invoice.amount}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700 font-semibold">
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-bold mb-6">Betaalmethode</h2>
            
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg mb-4">
              <div className="flex items-center">
                <svg className="w-12 h-8 mr-4" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#1434CB"/>
                  <path d="M18 16C18 13.7909 19.7909 12 22 12H26C28.2091 12 30 13.7909 30 16C30 18.2091 28.2091 20 26 20H22C19.7909 20 18 18.2091 18 16Z" fill="white"/>
                </svg>
                <div>
                  <div className="font-semibold">•••• •••• •••• 4242</div>
                  <div className="text-sm text-gray-600">Verloopt 12/2026</div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-semibold">
                Wijzigen
              </button>
            </div>

            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              + Nieuwe betaalmethode toevoegen
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

