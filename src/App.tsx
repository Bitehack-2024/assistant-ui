import {
  Badge,
  Box,
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  HStack,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import { unzip } from "unzipit";
import { useEffect, useState } from "react";
import { Toaster, toaster } from "./components/ui/toaster";

function App() {
  const [open, setOpen] = useState(false);
  const [userFile, setUserFile] = useState<any>();
  const [userFiles, setUserFiles] = useState<any>();

  const handleSubmitFile = async () => {
    toaster.create({
      title: "File upploaded",
      description: "Your file has been uploaded sucessfully!",
      type: "success",
    });

    const { entries } = await unzip(userFile);

    const files = [];
    for (let entry in entries) {
      files.push(await entries[entry].blob());
    }

    setUserFiles(files);
    setOpen(false);
  };

  const handleFileReader = async (event: any) => {
    const newFile = event.target.files[0];

    // const content = await newFile.text();

    // console.log(content);
    setUserFile(newFile);
  };

  useEffect(() => {
    console.log("userFile - completed");
    console.log(userFile);
  }, [userFile]);

  return (
    <>
      <Toaster />
      <HStack w={"90%"} mx={"auto"}>
        <HStack w={"full"} justifyContent={"space-between"} paddingY={"10px"}>
          <HStack>
            <Box fontWeight={"black"} color={"gray.600"}>
              Click Dziadek
            </Box>
            <Badge
              fontWeight={"black"}
              color={"gray.600"}
              colorPalette={"green"}
            >
              ASSISTANT UI
            </Badge>
          </HStack>
          <HStack gap={"8px"}>
            <Button variant={"outline"} borderRadius={"10px"}>
              Help
            </Button>
            <Button variant={"outline"} borderRadius={"10px"}>
              Your data
            </Button>
          </HStack>
        </HStack>
      </HStack>
      <VStack w={"60%"} mx={"auto"}>
        <DialogRoot
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          size={"md"}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size={"md"} mb={"20px"}>
              Upload file
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload zip</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Box mb={"10px"}>Upload file created by your person in need.</Box>
              <Input type="file" onChange={handleFileReader} />
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <Button onClick={() => handleSubmitFile()}>Save</Button>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
        {userFiles &&
          userFiles.map((imageData: any) => {
            return <Image src={URL.createObjectURL(imageData)} />;
          })}
      </VStack>
    </>
  );
}

export default App;
