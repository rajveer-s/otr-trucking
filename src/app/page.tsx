'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Scan,
  Bell,
  Calculator,
  FileText,
  Zap,
  Shield,
  Smartphone,
  Wifi,
} from 'lucide-react';
import MarketingLayout from './(marketing)/layout';

const features = [
  {
    name: 'Automated Fuel Receipt Scanning',
    description: 'Upload receipts and let AI extract data automatically. Track fuel expenses effortlessly.',
    icon: Scan,
  },
  {
    name: 'Mileage & Oil Change Reminders',
    description: 'Never miss maintenance with smart alerts. Keep your trucks running smoothly.',
    icon: Bell,
  },
  {
    name: 'Dispatcher Cut Calculator',
    description: 'Calculate dispatcher fees instantly. Know your exact earnings on every load.',
    icon: Calculator,
  },
  {
    name: 'Paperwork Organizer',
    description: 'Store and organize all your documents digitally. Access them anytime, anywhere.',
    icon: FileText,
  },
];

const performance = [
  {
    name: 'Blazing Fast Dashboard',
    description: 'Experience lightning-fast load times and smooth animations.',
    icon: Zap,
  },
  {
    name: 'AI-Powered Document Parsing',
    description: 'Extract data from documents automatically with high accuracy.',
    icon: Scan,
  },
  {
    name: 'Bank-Grade Security',
    description: 'Your data is encrypted and protected with enterprise security.',
    icon: Shield,
  },
  {
    name: 'Offline Mode Coming Soon',
    description: 'Work without internet connection. Changes sync when back online.',
    icon: Wifi,
  },
];

const testimonials = [
  {
    content: "This app has completely transformed how I manage my trucking business. The automated receipt scanning alone has saved me hours of work.",
    author: "John Smith",
    role: "Owner Operator",
    company: "Smith Trucking LLC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80"
  },
  {
    content: "The dispatcher cut calculator and paperwork organization features are game-changers. Everything is so much more organized now.",
    author: "Sarah Johnson",
    role: "Fleet Manager",
    company: "Johnson Logistics",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80"
  },
  {
    content: "I love how easy it is to track maintenance schedules. The reminders have helped me avoid costly repairs and downtime.",
    author: "Mike Davis",
    role: "Independent Driver",
    company: "Davis Transport",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&q=80"
  },
];

const pricing = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for independent drivers just getting started.',
    features: [
      'Basic load tracking',
      'Simple expense logging',
      'Manual document storage',
      'Email support',
    ],
    cta: 'Start for free',
  },
  {
    name: 'Pro Driver',
    price: '$19',
    period: '/month',
    description: 'Everything you need to run your trucking business efficiently.',
    features: [
      'All Starter features',
      'AI receipt scanning',
      'Maintenance reminders',
      'Dispatcher cut calculator',
      'Priority support',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Fleet',
    price: 'Contact us',
    description: 'Custom solutions for fleets with multiple trucks.',
    features: [
      'All Pro features',
      'Fleet management',
      'Team accounts',
      'Custom integrations',
      'Dedicated support',
    ],
    cta: 'Contact sales',
  },
];

const faqs = [
  {
    question: 'Does this work offline?',
    answer: 'Offline mode is coming soon! You\'ll be able to work without an internet connection, and all changes will sync automatically when you\'re back online.',
  },
  {
    question: 'How is rate per mile calculated?',
    answer: 'Rate per mile is calculated by dividing the total load payment by the total miles driven. Our system automatically factors in fuel costs and other expenses to give you accurate profitability metrics.',
  },
  {
    question: 'Can I export documents?',
    answer: 'Yes! You can export all your documents and data in various formats including PDF and Excel. This makes it easy to share information with your accountant or keep backups.',
  },
  {
    question: 'How secure is my data?',
    answer: 'We use bank-grade encryption to protect your data. All information is stored in secure cloud servers with regular backups. We never share your data with third parties without your explicit consent.',
  },
];

export default function LandingPage() {
  return (
    <MarketingLayout>
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              The Smartest Trucking Assistant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Track your loads, fuel, maintenance, and profits with zero hassle. The all-in-one solution for modern trucking operations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                <Link href="/login">Try for free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">See Dashboard</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 flow-root sm:mt-24"
          >
            <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/screenshot1.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              All-in-One Load & Truck Management
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Everything you need to manage your trucking business efficiently, all in one place.
            </motion.p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-[#18181b]/50 backdrop-blur-xl border-gray-800/50">
                    <CardHeader>
                      <div className="flex items-center gap-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316]">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <CardTitle>{feature.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 sm:py-32 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Trusted by Truckers Everywhere
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Hear what our users have to say about their experience.
            </motion.p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-[#18181b]/50 backdrop-blur-xl border-gray-800/50">
                  <CardContent className="relative p-6">
                    <div className="flex items-start gap-x-6">
                      <div className="h-20 w-20 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center ring-2 ring-gray-700 flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          width={80}
                          height={80}
                          className="h-20 w-20 object-cover"
                          onError={(e) => {
                            // @ts-ignore
                            e.target.src = '/avatars/default-avatar.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-base text-gray-300">{testimonial.content}</div>
                        <div className="mt-6">
                          <div className="font-semibold text-white">{testimonial.author}</div>
                          <div className="mt-1 text-sm text-gray-400">
                            {testimonial.role} • {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-24 sm:py-32 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Built for Performance
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Lightning fast, secure, and reliable. Just like your trucks.
            </motion.p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {performance.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-[#18181b]/50 backdrop-blur-xl border-gray-800/50">
                    <CardHeader>
                      <div className="flex items-center gap-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316]">
                          <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <CardTitle>{item.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Choose the plan that works best for your business.
            </motion.p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {pricing.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={tier.featured ? 'lg:mt-[-2rem]' : ''}
              >
                <Card className={`h-full bg-[#18181b]/50 backdrop-blur-xl border-gray-800/50 ${
                  tier.featured ? 'border-[#f97316] ring-2 ring-[#f97316]' : ''
                }`}>
                  <CardHeader>
                    <CardTitle className="flex items-baseline gap-x-2">
                      <span>{tier.name}</span>
                      {tier.featured && (
                        <span className="inline-flex items-center rounded-full bg-[#f97316]/10 px-2.5 py-0.5 text-xs font-medium text-[#f97316]">
                          Popular
                        </span>
                      )}
                    </CardTitle>
                    <div className="mt-4 flex items-baseline text-gray-100">
                      <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                      {tier.period && (
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-400">
                          {tier.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-400">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <svg
                            className="h-6 w-5 flex-none text-[#f97316]"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`mt-8 w-full ${
                        tier.featured ? 'bg-[#f97316] hover:bg-[#f97316]/90' : ''
                      }`}
                      variant={tier.featured ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href="/login">{tier.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 sm:py-32 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Common questions about our platform.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-16 max-w-2xl"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
    </MarketingLayout>
  );
}
