interface DeltaMessage {
  type: string;
  index: number;
  delta: {
    type: "content_block_delta";
    text: string;
  };
}

async function createSSEClient(options: any) {
  try {
    const response = await fetch("TODO");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("ReadableStream not supported");
    }

    // Get the response body as a readable stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    const messages: DeltaMessage[] = [];

    async function processStream() {
      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          console.log("Stream complete");
          const messageText = messages
            .sort((a, b) => {
              if (a.index < b.index) return -1;
              if (a.index > b.index) return 1;
              return 0;
            })
            .map((msg) => msg?.delta?.text ?? "UNDEFINED")
            .join("");
          console.log(messageText);
          break;
        }

        // Decode the chunk and add it to our buffer
        buffer += decoder.decode(value, { stream: true });

        // Process any complete events in the buffer
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // Keep the last incomplete line in the buffer

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6); // Remove 'data: ' prefix
            try {
              const parsedData = JSON.parse(data);
              options.onMessage?.(parsedData);
              messages.push(parsedData);
            } catch {
              // If not JSON, send raw data
              options.onMessage?.(data);
            }
          } else if (line.startsWith("event: ")) {
            const eventName = line.slice(7);
            options.onEvent?.(eventName);
          } else if (line === "") {
            // Empty line denotes end of event
            continue;
          }
        }
      }
    }

    // Start processing the stream
    await processStream().catch((error) => {
      options.onError?.(error);
    });

    // Return methods to control the connection
    return {
      close: () => {
        if (options.signal?.abortController) {
          options.signal.abortController.abort();
        }
        reader.cancel();
        console.log("Connection closed");
      },
    };
  } catch (error) {
    options.onError?.(error);
    throw error;
  }
}

// Example usage
async function example() {
  const abortController = new AbortController();

  const client = await createSSEClient({
    onMessage: (data: any) => {
      console.log("Received message:", data);
    },
    onEvent: (eventName: any) => {
      console.log("Received event:", eventName);
    },
    onError: (error: any) => {
      console.error("Error:", error);
    },
  });

  setTimeout(() => {
    client.close();
  }, 60000); // Close after 1 minute
}

example();
