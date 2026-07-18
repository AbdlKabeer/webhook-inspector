import React, { useState } from 'react';
import { TabItem,Tabs,Label, Select,TextInput, HelperText, Textarea, Button  } from 'flowbite-react';
import { Send, Inbox, Copy, RefreshCw } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const WebhookTester = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [webhookUrl, setWebhookUrl] = useState('36faf8eb6bc65312d371bc93bbbf853');
  const [payloadMethod, setPayloadMethod] = useState('POST');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [payloadContent, setPayloadContent] = useState('{\n  "message": "Hello Webhook!"\n}');
  const [receivedWebhooks, setReceivedWebhooks] = useState([
    {
      id: '981bd2bf-ff7c-4663-9438-cb334f551ba7',
      timestamp: '2025-03-28 08:09:15 UTC',
      method: 'POST',
      headers: {
        host: 'webhook-test.com',
        accept: '*/*',
        'cf-ray': '927sa4f20fdc86a1-IAD',
        version: 'HTTP/1.1'
      },
      body: { 
        status: "COMPLETED",
        reference: "4cebe4d3-2ae6-45b4-b933-38424ab67617",
        report_reference: "79c83936-0ce3-403a-946f-6b59ed11b8f8"
      }
    }
  ]);

  const generateNewWebhookUrl = () => {
    const newUrl = Math.random().toString(36).substring(2, 15);
    setWebhookUrl(newUrl);
    toast.success('New Webhook URL Generated');
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(`https://webhook-test.com/${webhookUrl}`);
    toast.success('URL Copied to Clipboard');
  };

  const sendWebhook = async () => {
    try {
      const parsedPayload = JSON.parse(payloadContent);

      const response = await fetch(destinationUrl, {
        method: payloadMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedPayload)
      });

      toast.success('Webhook Sent Successfully');
    } catch (error) {
      toast.error('Failed to Send Webhook');
      console.error('Webhook send error:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster position="top-right" />

      <div className="bg-white shadow-md rounded-lg">
        <Tabs aria-label="Default tabs" variant="default">
            <TabItem active={
                activeTab === 'send'
            } title="Send Webhook"  onClick={() => setActiveTab('send')}
            icon={Send}
            >
                <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Your Unique Webhook URL</h2>
                  <button 
                    onClick={generateNewWebhookUrl} 
                    className="text-gray-600 hover:text-blue-600 flex items-center"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                  </button>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <code className="text-blue-600 break-all">
                    https://webhook-test.com/{webhookUrl}
                  </code>
                  <button 
                    onClick={copyWebhookUrl} 
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-yellow-600 text-sm mt-2">
                  Warning: Payloads in this address will be deleted after 48 hours. Create an account to keep them persisted.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2 block">
                    <Label htmlFor="username3" >
                        Destination URL
                    </Label>
                    </div>
                    <TextInput id="username" placeholder="https://your-endpoint.com/webhook" required  />
                </div>
                  <div>
                    <div className="mb-2 block">
                        <Label htmlFor="countries">HTTP Method</Label>
                    </div>
                    <Select id="requestmethod" required>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="PATCH">PATCH</option>
                    </Select>
                </div>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Payload">Payload</Label>
                    </div>
                    <Textarea id="payload" placeholder="Enter JSON payload..." required rows={4} />
                </div>

                <Button onClick={sendWebhook}>
                    <Send className="mr-2 h-5 w-5" />
                    Send Webhook
                </Button>
              </div>
            </div>
            </TabItem>

            <TabItem active={
                    activeTab === 'receive'
                    } title="Received Webhooks" 
                    onClick={() => setActiveTab('receive')}
                    icon={Inbox}>
                        <div>
                    {receivedWebhooks.map((webhook) => (
                        <div key={webhook.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">
                                {webhook.method}
                            </span>
                            <span className="text-sm text-gray-600">
                                {webhook.timestamp}
                            </span>
                            </div>
                            <button className="text-red-500 hover:text-red-700">
                            Delete
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Headers
                            </h3>
                            <pre className="bg-white p-3 rounded-md text-xs overflow-x-auto border">
                                {JSON.stringify(webhook.headers, null, 2)}
                            </pre>
                            </div>
                            <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Body
                            </h3>
                            <pre className="bg-white p-3 rounded-md text-xs overflow-x-auto border">
                                {JSON.stringify(webhook.body, null, 2)}
                            </pre>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </TabItem>
        </Tabs>

       
      </div>
    </div>
  );
};

export default WebhookTester;