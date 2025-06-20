import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPopularBooks } from "@/server/statistics";
import { Suspense } from "react";

async function PopularBooksContent() {
  const popularBooks = await getPopularBooks();

  return (
    <CardContent className="pt-0">
      <div className="space-y-6">
        {popularBooks.map((book) => (
          <div key={book.id} className="flex items-start justify-between">
            <div className="space-y-1">
              <div>
                <span className="font-medium">{book.title}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  by {book.author}
                </span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <span>{book.category}</span>
                <span className="mx-2">•</span>
                <Badge variant="outline" className="text-xs">
                  {book.status}
                </Badge>
              </div>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {book.timesLoaned} loans
            </Badge>
          </div>
        ))}
        {popularBooks.length === 0 && (
          <div className="text-center text-muted-foreground py-6">
            No popular books data
          </div>
        )}
      </div>
    </CardContent>
  );
}

export function PopularBooks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Books</CardTitle>
        <CardDescription>Most frequently borrowed titles</CardDescription>
      </CardHeader>
      <Suspense
        fallback={
          <div className="p-4 text-center">Loading popular books...</div>
        }
      >
        <PopularBooksContent />
      </Suspense>
    </Card>
  );
}
